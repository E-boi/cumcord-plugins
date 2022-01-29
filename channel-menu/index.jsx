import { webpack } from '@cumcord/modules';
import { after, before } from '@cumcord/patcher';
import { Routes } from '@cumcord/modules/common/constants';

const patches = [];
const { getChannels } = webpack.findByProps('getChannels');
const { MenuItem } = webpack.findByProps('MenuItem');
const { transitionTo } = webpack.findByProps('transitionTo');

async function lazyPatchContextMenu(displayName, patch) {
  const m = webpack.findByDisplayName(displayName, false);
  if (m) patch(m);
  else {
    const module = webpack.findByProps('openContextMenuLazy');
    patches.unshift(
      before('openContextMenuLazy', module, args => {
        const lazyRender = args[1];
        args[1] = async () => {
          const render = await lazyRender(args[0]);

          return config => {
            const menu = render(config);
            if (menu?.type?.displayName === displayName && patch) {
              patches[0]();
              patch(webpack.findByDisplayName(displayName, false));
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

export default {
  onLoad() {
    lazyPatchContextMenu('GuildContextMenu', ContextMenu => {
      patches.push(
        after('default', ContextMenu, ([{ guild }], res) => {
          const channels = getChannels(guild.id).SELECTABLE;
          res.props.children.splice(
            3,
            0,
            <MenuItem id='guild-channels' label='Channels'>
              {channels.map(({ comparator, channel }) => (
                <MenuItem id={`guild-channel-${comparator}`} label={channel.name} action={() => transitionTo(Routes.CHANNEL(guild.id, channel.id))} />
              ))}
            </MenuItem>
          );
          return res;
        })
      );
    });
  },
  onUnload() {
    patches.forEach(i => i?.());
  },
};
