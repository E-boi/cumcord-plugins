import { batchFind } from '@cumcord/modules/webpack';
import { after } from '@cumcord/patcher';
import { persist } from '@cumcord/pluginData';
import Notice from './copmonents/Notice';

const [ChannelTextArea, HeaderBar, LockIcon, ChannelText, classes] = batchFind(e => {
  e.findByDispNameDeep('ChannelTextAreaContainer');
  e.findByDisplayName('HeaderBarContainer', false);
  e.findByDisplayName('LockClosed');
  e.findByDisplayName('ChannelText');
  e.findByProps('iconWrapper', 'clickable');
});

const injections = [];

export default {
  onLoad() {
    if (!persist.ghost.channels) persist.store.channels = {};
    injections.push(
      after('render', ChannelTextArea.type, ([{ channel }], res) => {
        return (
          <Notice onClick={e => (e === 2 ? toggle() : toggle(channel.id))} channel={channel}>
            {res}
          </Notice>
        );
      })
    );

    injections.push(
      after('default', HeaderBar, ([{ channelId }], res) => {
        if (!channelId) return res;
        if (!res.props.children.props.toolbar) res.props.children.props.toolbar = [];
        res.props.children.props.toolbar.push(
          <HeaderBar.default.Icon onClick={toggle} icon={() => <LockIcon />} tooltip='Toogle Global Lock' />,
          <HeaderBar.default.Icon onClick={() => toggle(channelId)} icon={() => <ChannelText />} tooltip='Toogle Channel Lock' />
        );
        return res;
      })
    );
  },
  onUnload() {
    injections.forEach(i => i?.());
  },
};

function toggle(channel) {
  if (!channel) persist.store.global = !persist.ghost.global;
  else persist.store.channels[channel] = !persist.ghost.channels[channel];
}
