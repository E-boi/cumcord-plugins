import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { Routes } from '@cumcord/modules/common/constants';

const patches = [];
const { getChannels } = webpack.findByProps('getChannels');
const { MenuItem } = webpack.findByProps('MenuItem');
const { transitionTo } = webpack.findByProps('transitionTo');

export default {
  onLoad() {
    patches.push(
      after('default', webpack.findByDisplayName('GuildContextMenuWrapper', false), (_, res) => {
        after(
          'type',
          res.props.children,
          ([{ guild }], res) => {
            const channels = getChannels(guild.id).SELECTABLE;
            res.props.children.splice(
              3,
              0,
              <MenuItem id='guild-channels' label='Channels'>
                {channels.map(({ comparator, channel }) => (
                  <MenuItem
                    id={`guild-channel-${comparator}`}
                    label={channel.name}
                    action={() => transitionTo(Routes.CHANNEL(guild.id, channel.id))}
                  />
                ))}
              </MenuItem>
            );
            return res;
          },
          true
        );
        return res;
      })
    );
  },
  onUnload() {
    console.log(patches);
    patches.forEach(i => i?.());
  },
};
