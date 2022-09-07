import { Flux, FluxDispatcher } from '@cumcord/modules/common';
import { batchFind } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';

const [ChannelStore, RelationshipStore, UserStore, PrivateChannelStore] = batchFind(f => {
  f.findByProps('hasChannel');
  f.findByProps('isBlocked', 'isFriend');
  f.findByProps('getUser', 'getCurrentUser');
  f.findByProps('getPrivateChannelIds');
});

const typingUsers = {};

function handleTypingStart({ channelId, userId }) {
  if (!ChannelStore?.getMutablePrivateChannels()[channelId]) return;
  const channelTypingUsers = Object.assign({}, typingUsers[channelId] || Object.freeze({}));

  const isCurrentUser = userId === UserStore?.getCurrentUser()?.id,
    isFriend = persist.ghost.ignoreNonFriend ?? true ? RelationshipStore.isFriend(userId) : true,
    isBlocked = persist.ghost.ignoreBlocked ?? true ? RelationshipStore.isBlocked(userId) : false;

  if (!isCurrentUser && isFriend && !isBlocked) {
    channelTypingUsers[userId] = UserStore?.getUser(userId);
    typingUsers[channelId] = channelTypingUsers;

    FluxDispatcher.dispatch({ type: 'CCDMTI_REFRESH_HOME' });
  }
}

function handleTypingStop({ channelId, userId }) {
  if (!ChannelStore?.getMutablePrivateChannels()[channelId]) return;
  const channelTypingUsers = Object.assign({}, typingUsers[channelId]);

  if (channelTypingUsers && channelTypingUsers[userId]) {
    delete channelTypingUsers[userId];

    if (Object.keys(channelTypingUsers).length > 0) typingUsers[channelId] = channelTypingUsers;
    else delete typingUsers[channelId];

    FluxDispatcher.dispatch({ type: 'CCDMTI_REFRESH_HOME' });
  }
}

function handleMessageCreate({ channelId, message }) {
  if (!ChannelStore?.getMutablePrivateChannels()[channelId]) return;
  handleTypingStop({ channelId, userId: message.author.id });
}

class PrivateChannelTypingStore extends Flux.Store {
  getFlattenedDMTypingUsers() {
    const privateChannels = PrivateChannelStore?.getPrivateChannelIds();

    return privateChannels.map(channelId => Object.values(typingUsers[channelId] || {})).flat();
  }

  getDMTypingUsers(channelId) {
    if (channelId) return typingUsers[channelId] || {};
    return typingUsers;
  }
}

export default new PrivateChannelTypingStore(FluxDispatcher, {
  TYPING_START: handleTypingStart,
  TYPING_STOP: handleTypingStop,
  MESSAGE_CREATE: handleMessageCreate,
});
