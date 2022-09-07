import { i18n } from '@cumcord/modules/common';
import { batchFind } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';
import { useNest } from '@cumcord/utils';
import { DTMI_TYPING_USERS_COUNT } from '../strings';

const [Spinner, { TooltipContainer: Tooltip }, ChannelStore, ChannelUtils, { transitionTo }] = batchFind(f => {
  f.findByDisplayName('Spinner');
  f.findByProps('TooltipContainer');
  f.findByProps('hasChannel');
  f.findByProps('openPrivateChannel');
  f.findByProps('transitionTo');
});

export default ({ typingUsers, typingUserFlat, className, badge, clickable }) => {
  useNest(persist);

  if (persist.ghost.indicatorStyle === 'badge') {
    if (!badge) return null;
    const badgeStyle = { backgroundColor: persist.ghost.indicatorBgColor || '#43b581' };
    const animateIndicator = persist.ghost.animateIndicator ?? true;

    return (
      <Spinner
        type='pulsingEllipsis'
        animated={animateIndicator}
        className='dm-typing-badge'
        itemClassName='dm-typing-badge-spinner'
        style={badgeStyle}
      />
    );
  }

  return (
    <div className={className} onClick={() => clickable && handleOpenPrivateChannel(typingUsers, typingUserFlat)}>
      <Tooltip
        color='black'
        position='right'
        text={formatUsernames(typingUserFlat)}
        className={['dm-typing-indicator', clickable && 'clickable'].join(' ')}
      >
        {renderIndicator(typingUserFlat)}
      </Tooltip>
    </div>
  );
};

function handleOpenPrivateChannel(typingUsers, [user]) {
  const channelIds = Object.keys(typingUsers);
  if (!channelIds[0]) return;
  const privateGroupChannel = Object.values(ChannelStore.getMutablePrivateChannels()).find(
    channel => channel.isGroupDM() && channel.id === channelIds[0]
  );

  if (privateGroupChannel) return transitionTo(Routes.CHANNEL('@me', privateGroupChannel.id));

  return ChannelUtils.openPrivateChannel(user.id);
}

function formatUsernames(typingUserFlat) {
  const strings = [];
  const usernames = typingUserFlat.map(u => u.username);

  if (usernames.length === 1) return i18n.Messages.ONE_USER_TYPING.format({ a: usernames[0] });

  const threeUsersTyping = i18n.Messages.THREE_USERS_TYPING.format({ a: null, b: null, c: null });
  const typingStrings = threeUsersTyping.filter(element => typeof element === 'string');
  const translations = Object.fromEntries(
    typingStrings.map((str, index) => {
      const keys = ['user', 'comma', 'and', 'typing'];
      const key = [keys[strings.length > 3 ? index : index + 1]];

      return [key, str];
    })
  );

  translations.extra = num => {
    const nowPlayingHeader = i18n.Messages.ACTIVITY_FEED_NOW_PLAYING_HEADER_TWO_KNOWN.format({ user1: null, user2: null, extras: num });
    const strings = nowPlayingHeader.filter(element => typeof element === 'string');
    return strings[strings.length - 1];
  };

  const maxTypingUsers = persist.ghost.maxTypingUsers || 3;

  outerLoop: for (let i = 0; i < usernames.length; i++) {
    const additionalUsers = usernames.length - i;
    switch (true) {
      case i === maxTypingUsers:
        strings.push(`${translations.extra(additionalUsers)}${translations.typing}`);
        break outerLoop;
      case i === usernames.length - 1:
        strings.push(translations.and);
        break;
      case i !== 0:
        strings.push(translations.comma);
    }

    strings.push(<strong>{usernames[i]}</strong>);

    if (i === usernames.length - 1) strings.push(translations.typing);
  }

  return strings;
}

function renderIndicator(typingUserFlat) {
  const indicator = [];

  const indicatorStyle = persist.ghost.indicatorStyle || 'icon';
  const animateIndicator = persist.ghost.animateIndicator ?? true;

  if ((indicatorStyle === 'icon' || indicatorStyle === 'both') && typingUserFlat.length > 0)
    indicator.push(
      <Spinner
        type='pulsingEllipsis'
        animated={animateIndicator}
        style={{
          opacity: 0.7,
          marginBottom: indicatorStyle === 'both' ? 5 : '',
          height: '10px',
        }}
      />
    );

  if (indicatorStyle === 'text' || indicatorStyle === 'both') indicator.push(DTMI_TYPING_USERS_COUNT.format({ count: typingUserFlat.length }));
  return indicator;
}
