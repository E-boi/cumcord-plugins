import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';
import { React, FluxDispatcher } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import GuildPins from '../components/GuildPins';

const HomeButton = findByProps('HomeButton');
const UnreadDMs = findByDisplayName('TransitionGroup', false);

export default function () {
  this.injections.push(
    after('HomeButton', HomeButton, (_, res) => {
      if (!Array.isArray(res)) res = [res];
      if (this.settings.get('guildlist', []).includes(res[0].props.selectedChannelId)) res[0].props.selected = false;
      // else res[0].props.selected = true;
      res.push(React.createElement(GuildPins, { settings: this.settings }));
      return res;
    })
  );
  this.injections.push(
    after('render', UnreadDMs.default.prototype, (_, res) => {
      if (!res.props.children.length) return res;
      res.props.children.forEach((e, idx) => {
        if (this.settings.get('guildlist', []).includes(e.key.replace('.$', ''))) {
          res.props.children.splice(idx, 1);
          FluxDispatcher.dirtyDispatch({ type: `PDM_UPDATE`, id: e.key.replace('.$', '') });
        }
      });
      return res;
    })
  );
}
