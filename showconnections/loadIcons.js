import { findByProps } from '@cumcord/modules/webpack';
import { FluxDispatcher, constants } from '@cumcord/modules/common';

const { openUserProfileModal, closeUserProfileModal } = findByProps('openUserProfileModal');
const { getCurrentUser } = findByProps('getCurrentUser', 'getUser');

export default () => {
  if (findByProps('connectedAccount')) return;
  const e = () => {
    setTimeout(closeUserProfileModal, 100);
    FluxDispatcher.unsubscribe(constants.ActionTypes.USER_PROFILE_MODAL_OPEN, e);
  };
  FluxDispatcher.subscribe(constants.ActionTypes.USER_PROFILE_MODAL_OPEN, e);
  openUserProfileModal({
    userId: getCurrentUser().id,
    guildId: null,
  });
};
