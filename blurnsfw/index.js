import { after } from '@cumcord/patcher';
import { webpack } from '@cumcord/modules';
import { React, FluxDispatcher } from '@cumcord/modules/common';
import css from './style.css';
import Settings from './settings';
import { persist } from '@cumcord/pluginData';

const injections = [];
let cssInject;
const ChannelItem = webpack.findByDisplayName('ChannelItem', false);
const { getChannel } = webpack.findByProps('getChannel', 'getDMFromUserId');

function handleChannel({ channelId }) {
  const channel = getChannel(channelId);
  if (!channel || persist.ghost.blocked?.includes(channelId) || persist.ghost.blocked?.includes(channel.recipients[0])) return;
  else if (
    channel.nsfw ||
    (channel.type === 1 && persist.ghost.dm) ||
    (channel.type === 3 && persist.ghost.gc) ||
    persist.ghost.blurChannels?.includes(channel.id) ||
    persist.ghost.blurChannels?.includes(channel.recipients[0])
  )
    blurChannel();
  else document.body.classList.remove('blur');
}

export default {
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
  settings: Settings,
};

function blurChannel() {
  const blur = persist.ghost.blur || 10;
  const timing = persist.ghost.timing || 1;
  const element = document.body;
  element.style.setProperty('--blur-effect', `blur(${blur}px)`);
  element.style.setProperty('--blur-timing', `${timing}s`);
  element.classList.add('blur');
}
