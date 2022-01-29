import { after, before } from '@cumcord/patcher';
import { findByDisplayName, findByProps } from '@cumcord/modules/webpack';
import { React } from '@cumcord/modules/common';
import { findInReactTree } from '@cumcord/utils';
import { setupContextMenu } from '../utils';

const ContextMenus = ['DMUserContextMenu', 'GroupDMUserContextMenu', 'GuildChannelUserContextMenu', 'GroupDMContextMenu'];

async function lazyPatchContextMenu(displayName, patch) {
  const m = findByDisplayName(displayName, false);
  if (m) patch(m);
  else {
    const module = findByProps('openContextMenuLazy');
    this.injections.unshift(
      before('openContextMenuLazy', module, args => {
        const lazyRender = args[1];
        args[1] = async () => {
          const render = await lazyRender(args[0]);

          return config => {
            const menu = render(config);
            if (menu?.type?.displayName === displayName && patch) {
              this.injections[0]();
              patch(findByDisplayName(displayName, false));
              patch = false;
            }
            return menu;
          };
        };
        return args;
      })
    );
  }
}

export default function () {
  lazyPatchContextMenu = lazyPatchContextMenu.bind(this);

  ContextMenus.forEach(contextmenu => {
    lazyPatchContextMenu(contextmenu, ContextMenu => {
      this.injections.push(
        after('default', ContextMenu, ([{ channel }], res) => {
          const group = findInReactTree(
            res,
            c => Array.isArray(c) && c.find(item => item?.props?.id === 'user-profile' || item?.props?.id === 'remove-icon')
          );
          if (!group) return res;
          group.push(setupContextMenu(channel, this.settings, true));
          return res;
        })
      );
    });
  });
}
