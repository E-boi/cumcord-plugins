import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';
import { FluxDispatcher, constants } from '@cumcord/modules/common';
import { persist } from '@cumcord/pluginData';
import { Tooltip } from '.';
import { setupContextMenu } from '../utils';

const { default: PrivateChannel } = findByProps('DirectMessage');
const { getUser } = findByProps('getUser', 'findByTag');
const { isMobileOnline, getStatus, getState } = findByProps('isMobileOnline');
const { getChannel } = findByProps('getDMFromUserId');
const { listItemTooltip } = findByProps('listItemTooltip');
const { openContextMenu } = findByProps('openContextMenu');
const { transitionTo } = findByProps('transitionTo');
const { getMentionCount } = findByProps('getMentionCount');
const Pill = findByDisplayName('AnimatedHalfPill');

export default () => {
  const [ids, setIds] = React.useState(persist.ghost.guildlist ?? []);

  React.useEffect(() => {
    const update = ({ removeAll }) => setIds(removeAll ? [] : [...(persist.ghost.guildlist ?? [])]);
    FluxDispatcher.subscribe('PDM_GUILDLIST_ADD', update);
    FluxDispatcher.subscribe('PDM_GUILDLIST_REMOVE', update);

    return () => {
      FluxDispatcher.unsubscribe('PDM_GUILDLIST_ADD', update);
      FluxDispatcher.unsubscribe('PDM_GUILDLIST_REMOVE', update);
    };
  });

  return ids.map(id => <Pin channelId={id} />);
};

function Pin({ channelId }) {
  const [hovered, setHovered] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [unread, setUnread] = React.useState(!!getMentionCount(channelId));
  const channel = getChannel(channelId);
  if (!channel) return null;
  const user = getUser(channel.recipients[0]);
  const [status, setStatus] = React.useState(getStatus(user?.id));
  const avatar = PrivateChannel.prototype.renderAvatar.call({
    props: {
      user: user,
      channel: channel,
      status: status,
      isMobile: isMobileOnline.bind({ getState: () => getState() })(user?.id), // a pc plugin was erroring without the "getState" function
    },
  });
  avatar.props.src = avatar.props.src.replace('size=32', 'size=64');

  React.useEffect(() => {
    const update = e => e.user?.id === user?.id && setStatus(getStatus(e.user.id));
    const selectedUpdate = e => {
      if (e.channelId === channel.id) setSelected(true);
      else setSelected(false);
    };
    const unreadUpdate = e => e.id === channelId && setUnread(!!getMentionCount(channelId));

    FluxDispatcher.subscribe('PRESENCE_UPDATE', update);
    FluxDispatcher.subscribe(`PDM_UPDATE`, unreadUpdate);
    FluxDispatcher.subscribe('CHANNEL_SELECT', selectedUpdate);

    return () => {
      FluxDispatcher.unsubscribe('PRESENCE_UPDATE', update);
      FluxDispatcher.unsubscribe('CHANNEL_SELECT', selectedUpdate);
      FluxDispatcher.unsubscribe(`PDM_UPDATE`, unreadUpdate);
    };
  });

  return (
    <Tooltip text={channel.type === 3 ? channel.name : user.username} position='left' aria-label={false} tooltipClassName={listItemTooltip}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onContextMenu={e => {
          openContextMenu(e, () => setupContextMenu(channel));
        }}
        onClick={() => transitionTo(constants.Routes.CHANNEL('@me', channel.id))}
        className='cc-pd-guildpins'
      >
        <Pill className='pill-L_aLMQ' unread={unread} selected={selected} hovered={hovered} />
        {avatar}
      </div>
    </Tooltip>
  );
}
