import { Flux, FluxDispatcher } from '@cumcord/modules/common';
import { findByProps } from '@cumcord/modules/webpack';
import { after } from '@cumcord/patcher';
import { persist } from '@cumcord/pluginData';
import { findInReactTree } from '@cumcord/utils';
import Settings from './components/Settings';
import TypingIndicator from './components/TypingIndicator';
import dmTypingStore from './dmTypingStore';
import css from './style.css';

const HomeButton = findByProps('HomeButton');
const { listItem } = findByProps('guildSeparator', 'listItem');
const injections = [];

export default {
  onLoad() {
    const ConnectedTypingIndicator = Flux.connectStores([dmTypingStore], ({ typingUsers, typingUsersFlat }) => ({
      ...typingUsers,
      ...typingUsersFlat,
    }))(TypingIndicator);

    injections.push(
      after('HomeButton', HomeButton, ([props], res) => {
        const forceUpdate = React.useState({})[1];

        React.useEffect(() => {
          const callback = () => forceUpdate({});

          FluxDispatcher.subscribe('CCDMTI_REFRESH_HOME', callback);

          return () => FluxDispatcher.unsubscribe('CCDMTI_REFRESH_HOME', callback);
        }, []);

        if (!Array.isArray(res)) res = [res];

        const typingUsersFlat = props.typingUserFlat || dmTypingStore.getFlattenedDMTypingUsers();
        const typingUsers = props.typingUsers || dmTypingStore.getDMTypingUsers();

        const indicatorStyle = persist.ghost.indicatorStyle || 'icon';
        const hideWhenViewed = persist.ghost.hideWhenViewed ?? true;

        if (hideWhenViewed) {
          const currentDMChannelId = window.location.href.match(/@me\/(\d+)/) && window.location.href.match(/@me\/(\d+)/)[1];
          if (currentDMChannelId && Object.keys(typingUsers).length === 1 && typingUsers[currentDMChannelId]) return res;
        }

        if (indicatorStyle === 'badge' && typingUsersFlat.length > 0) {
          const og = res[0].type;
          if (og)
            res[0].type = (...args) => {
              const children = og(...args);
              const badgeContainer = findInReactTree(children, r => r.type?.displayName === 'BlobMask');
              if (!badgeContainer) return children;
              badgeContainer.props.lowerBadgeWidth = 28;
              badgeContainer.props.lowerBadge = <ConnectedTypingIndicator badge={true} typingUserFlat={typingUsers} typingUsers={typingUsers} />;
              return children;
            };
        } else
          res.splice(
            1,
            0,
            <ConnectedTypingIndicator
              className={listItem}
              clickable={typingUsersFlat.length === 1}
              typingUsers={typingUsers}
              typingUserFlat={typingUsersFlat}
            />
          );
        return res;
      })
    );

    injections.push(css());
  },
  onUnload() {
    injections.forEach(i => i?.());
  },
  settings: Settings,
};
