import { findByProps } from '@cumcord/modules/webpack';
import { FluxDispatcher } from '@cumcord/modules/common';

const { openUserProfileModal, closeUserProfileModal } = findByProps('openUserProfileModal');
const { getCurrentUser } = findByProps('getCurrentUser', 'getUser');

export default function loadIcons() {
  if (findByProps('connectedAccount')) return;
  if (!getCurrentUser()) return setTimeout(loadIcons, 100);
  const e = () => {
    setTimeout(() => closeUserProfileModal(), 100);
    FluxDispatcher.unsubscribe('USER_PROFILE_MODAL_OPEN', e);
  };
  FluxDispatcher.subscribe('USER_PROFILE_MODAL_OPEN', e);
  openUserProfileModal({
    userId: getCurrentUser().id,
    guildId: null,
  });
}
