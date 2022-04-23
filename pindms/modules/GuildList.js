import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';
import { React, FluxDispatcher } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import GuildPins from '../components/GuildPins';
import { getSetting } from '../utils';

const HomeButton = findByProps('HomeButton');
const UnreadDMs = findByDisplayName('TransitionGroup', false);

export default function () {
  this.injections.push(
    after('HomeButton', HomeButton, (_, res) => {
      if (!Array.isArray(res)) res = [res];
      if (getSetting('guildlist', []).includes(res[0].props.selectedChannelId)) res[0].props.selected = false;
      // else res[0].props.selected = true;
      res.push(React.createElement(GuildPins));
      return res;
    })
  );
  this.injections.push(
    after('render', UnreadDMs.default.prototype, (_, res) => {
      if (!res.props.children.length) return res;
      res.props.children.forEach((e, idx) => {
        if (getSetting('guildlist', []).includes(e.key.replace('.$', ''))) {
          res.props.children.splice(idx, 1);
          FluxDispatcher.dirtyDispatch({ type: `PDM_UPDATE`, id: e.key.replace('.$', '') });
        }
      });
      return res;
    })
  );
}
