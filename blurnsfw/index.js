import { after } from '@cumcord/patcher';
import { webpack } from '@cumcord/modules';
import { React, FluxDispatcher } from '@cumcord/modules/common';
import css from './style.css';
import settings from './settings';

const injections = [];
let cssInject;
const ChannelItem = webpack.findByDisplayName('ChannelItem', false);
const { getChannel } = webpack.findByProps('getChannel', 'getDMFromUserId');

function handleChannel({ channelId }) {
  const channel = getChannel(channelId);
  if (this.ghost.blocked?.includes(channelId) || this.ghost.blocked?.includes(channel.recipients[0])) return;
  else if (
    channel.nsfw ||
    (channel.type === 1 && this.ghost.dm) ||
    (channel.type === 3 && this.ghost.gc) ||
    this.ghost.blurChannels?.includes(channel.id) ||
    this.ghost.blurChannels?.includes(channel.recipients[0])
  )
    blurChannel();
  else document.body.classList.remove('blur');
}

export default ({ persist }) => {
  handleChannel = handleChannel.bind(persist);
  blurChannel = blurChannel.bind(persist);
  return {
    onLoad() {
      cssInject = css();
      injections.push(
        after('default', ChannelItem, ([{ channel }], res) => {
          if (!channel.nsfw || persist.ghost.notags) return;
          res.props.children.props.children[1].props.children[1].props.children.push(
            React.createElement('div', { className: 'nsfw-badge' }, React.createElement('div', { className: 'nsfw-text' }, 'NSFW'))
          );
        })
      );

      FluxDispatcher.subscribe('CHANNEL_SELECT', handleChannel);
    },
    onUnload() {
      FluxDispatcher.unsubscribe('CHANNEL_SELECT', handleChannel);
      cssInject?.();
      injections.forEach(i => i());
    },
    settings: React.createElement(settings, { persist }),
  };
};

function blurChannel() {
  const blur = this.ghost.blur || 10;
  const timing = this.ghost.timing || 1;
  const element = document.body;
  element.style.setProperty('--blur-effect', `blur(${blur}px)`);
  element.style.setProperty('--blur-timing', `${timing}s`);
  element.classList.add('blur');
}
