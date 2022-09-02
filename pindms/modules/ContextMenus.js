import { after, before } from '@cumcord/patcher';
import { findByProps } from '@cumcord/modules/webpack';
import { findInReactTree } from '@cumcord/utils';
import { setupContextMenu } from '../utils';

const ContextMenus = ['DMUserContextMenu', 'GroupDMUserContextMenu', 'GroupDMContextMenu'];
const { getDMFromUserId, getChannel } = findByProps('getDMFromUserId');

async function lazyPatchContextMenu(displayName, patch) {
  const module = findByProps('openContextMenuLazy');
  this.injections.push(
    before('openContextMenuLazy', module, args => {
      const lazyRender = args[1];
      args[1] = async () => {
        const render = await lazyRender(args[0]);

        return config => {
          const menu = render(config);
          after(
            'type',
            menu,
            (_, r1) => {
              if (r1.props.children.type)
                after(
                  'type',
                  r1.props.children,
                  (_, r2) => {
                    if (r2.props.children.type.displayName === displayName) patch(r2.props.children);
                    return r2;
                  },
                  true
                );
              return r1;
            },
            true
          );
          return menu;
        };
      };
      return args;
    })
  );
}

export default function () {
  lazyPatchContextMenu = lazyPatchContextMenu.bind(this);

  ContextMenus.forEach(contextmenu => {
    lazyPatchContextMenu(contextmenu, ContextMenu =>
      after(
        'type',
        ContextMenu,
        ([args], res) => {
          const group = findInReactTree(
            res,
            c => Array.isArray(c) && c.find(item => item?.props?.id === 'user-profile' || item?.props?.id === 'remove-icon')
          );
          if (!group) return res;
          const channel = args.channel || getChannel(getDMFromUserId(args.user.id));
          if (!channel) return;
          group.push(setupContextMenu(args.channel || getChannel(getDMFromUserId(args.user.id)), true));
          return res;
        },
        true
      )
    );
  });
}
