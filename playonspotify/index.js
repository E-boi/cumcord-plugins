import { findByDisplayName } from '@cumcord/modules/webpack';
import { React } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';
import { PlayButton, QueueButton } from './PlayButton';

let injection;
const MiniPopover = findByDisplayName('MiniPopover', false);

export default {
  onLoad() {
    injection = after('default', MiniPopover, (_, res) => {
      const { message } = findInReactTree(res, c => c?.message);
      if (!message) return res;

      const embed = message.embeds.find(e => e.provider?.name === 'Spotify');

      if (!embed) return res;

      const { url, rawTitle: title } = embed;

      const [, , type, id] = url.match(/(https?:\/\/)?open.spotify.com\/(album|track|playlist)\/([^?]+)/) ?? [];
      if (!type || !id) return res;

      const uri = `spotify:${type}:${id}`;

      res.props.children.unshift(
        React.createElement(PlayButton, { uri, title, isTrack: type === 'track' }),
        React.createElement(QueueButton, { uri, title })
      );
      return res;
    });
  },
  onUnload() {
    injection?.();
  },
};
