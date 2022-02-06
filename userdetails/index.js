import { findByDisplayName, findByProps } from '@cumcord/modules/webpack';
import { after } from '@cumcord/patcher';
import { React, i18n } from '@cumcord/modules/common';
import { persist } from '@cumcord/pluginData';
import Settings from './settings';
import css from './style.css';

const injections = [];
const Text = findByDisplayName('Text');
const Popout = findByProps('UserPopoutInfo');
const { getMember } = findByProps('getMember');
const { getGuildId } = findByProps('getLastSelectedGuildId');

function lazyPatchProfileModal(filter, patch) {
  const m = findByDisplayName(filter, false);
  if (m) patch(m);
  else {
    const module = findByProps('openUserProfileModal');
    injections.unshift(
      after('openUserProfileModal', module, args => {
        setTimeout(() => patch(findByDisplayName(filter, false)), 500);
        injections[0]?.();
        return args;
      })
    );
  }
}

export default {
  onLoad() {
    injections.push(css());

    lazyPatchProfileModal('UserProfileModalHeader', Modal => {
      injections.push(
        after('default', Modal, ([{ user }], res) => {
          const createdAt = dateToString(user.createdAt);
          res.props.children.splice(3, 0, React.createElement(Text, { className: 'createdAt-text' }, `Created on ${createdAt}`));
          return res;
        })
      );
      // update modal if opened
      document.querySelector('[aria-controls="mutual_guilds-tab"]')?.click?.();
      document.querySelector('[aria-controls="user_info-tab"]')?.click?.();
    });

    injections.push(
      after('UserPopoutInfo', Popout, ([{ user }], res) => {
        const member = getMember(getGuildId(), user.id);
        if (!member) return;
        const joinedAt = dateToString(new Date(member.joinedAt));
        const createAt = dateToString(user.createdAt);
        res.props.children.splice(
          2,
          0,
          React.createElement('div', null, [
            React.createElement(Text, null, `Created on ${createAt}`),
            React.createElement(Text, null, `Joined on ${joinedAt}`),
          ])
        );
        return res;
      })
    );
  },

  onUnload() {
    injections.forEach(i => i?.());
  },

  settings: React.createElement(Settings),
};

function dateToString(date) {
  if (!date || date === '-') return '-';
  const customPopout = persist.ghost.custom;
  const hour12 = persist.ghost.hour12;
  if (persist.ghost.custom || customPopout) {
    let h = date.getHours(),
      ampm = '';
    if (hour12) {
      ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
    }
    const format = persist.ghost.format || '%d.%m.%y, %H:%M:%S %ampm';
    return format
      .replace(/%d/g, ('0' + date.getDate()).substr(-2))
      .replace(/%m/g, ('0' + (date.getMonth() + 1)).substr(-2))
      .replace(/%y/g, date.getFullYear())
      .replace(/%H/g, ('0' + h).substr(-2))
      .replace(/%M/g, ('0' + date.getMinutes()).substr(-2))
      .replace(/%S/g, ('0' + date.getSeconds()).substr(-2))
      .replace(/%ampm/g, ampm);
  }
  return date.toLocaleString(i18n.getLocale(), { hour12 });
}
