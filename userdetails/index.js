import { findByDisplayName, findByProps, findAsync } from '@cumcord/modules/webpack';
import { after } from '@cumcord/patcher';
import { React, i18n } from '@cumcord/modules/common';
import { persist } from '@cumcord/pluginData';
import Settings from './settings';
import css from './style.css';

const injections = [];
const Text = findByDisplayName('Text') || findByDisplayName('LegacyText');
const Popout = findByProps('UserPopoutInfo');
const { getMember } = findByProps('getMember');
const { getGuildId } = findByProps('getLastSelectedGuildId');
let unloaded = false;

export default {
  async onLoad() {
    unloaded = false;
    injections.push(css());

    injections.push(
      after('UserPopoutInfo', Popout, ([{ user }], res) => {
        const member = getMember(getGuildId(), user.id);
        if (!member) {
          const createdAt = dateToString(user.createdAt);
          res.props.children.splice(2, 0, React.createElement(Text, null, `Created on ${createdAt}`));
          return res;
        }
        const joinedAt = dateToString(new Date(member.joinedAt));
        const createdAt = dateToString(user.createdAt);
        res.props.children.splice(
          2,
          0,
          React.createElement('div', null, [
            React.createElement(Text, null, `Created on ${createdAt}`),
            React.createElement(Text, null, `Joined on ${joinedAt}`),
          ])
        );
        return res;
      })
    );

    const UserProfileModalHeader = await findAsync(() => findByDisplayName('UserProfileModalHeader', false));
    if (unloaded) return;

    injections.push(
      after('default', UserProfileModalHeader, ([{ user }], res) => {
        const createdAt = dateToString(user.createdAt);
        res.props.children.splice(3, 0, React.createElement(Text, { className: 'createdAt-text' }, `Created on ${createdAt}`));
        return res;
      })
    );
  },

  onUnload() {
    unloaded = true;
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
