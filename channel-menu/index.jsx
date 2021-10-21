import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { Routes } from '@cumcord/modules/common/constants';

let patch;
const ContextMenu = webpack.find(m => m.default?.displayName === 'GuildContextMenu');
const { getChannels } = webpack.findByProps('getChannels');
const { MenuItem } = webpack.findByProps('MenuItem');
const { transitionTo } = webpack.findByProps('transitionTo');

export default {
	onLoad() {
		patch = after('default', ContextMenu, ([{ guild }], res) => {
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
		});

		ContextMenu.default.displayName = 'GuildContextMenu';
	},
	onUnload() {
		patch?.();
	},
};
