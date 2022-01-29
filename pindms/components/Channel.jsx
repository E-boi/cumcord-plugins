import { findByProps } from '@cumcord/modules/webpack';

const { GroupDM, DirectMessage } = findByProps('DirectMessage');
const { getChannel } = findByProps('getChannel', 'hasChannel');

export default ({ channelId, selected }) => {
  const channel = getChannel(channelId);
  if (!channel) return null;

  if (channel.type === 3) return <GroupDM channel={channel} selected={selected} tabIndex={-1} />;
  else return <DirectMessage channel={channel} selected={selected} tabIndex={-1} />;
};
