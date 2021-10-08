import { webpack } from '@cumcord/modules';
import { constants } from '@cumcord/modules/common';
import { close, ConfirmModal, Mention, Text } from '.';

const { getGuild } = webpack.findByProps('getGuild');
const { getUser } = webpack.findByProps('getUser');
const { getChannel } = webpack.findByProps('getChannel');
const { transitionTo } = webpack.findByProps('transitionTo');
const { marginBottom20 } = webpack.findByProps('marginBottom20');
const moment = webpack.find(m => m.prototype?.toISOString);

export default ({ user: userId, channel: channelId, friend }) => {
	const user = getUser(userId);
	const channel = channelId && getChannel(channelId);
	const guild = channel && getGuild(channel.guild_id);
	console.log(friend);
	return (
		<ConfirmModal red={false} transitionState={0} header={`${user.username} Information`} cancelText='Alright' onCancel={close} onClose={() => {}}>
			<div className='ccbf-information-modal'>
				{!channel && (
					<Text size={Text.Sizes.SIZE_16} className={marginBottom20}>
						{user.username} hasn't been seen anywhere recently.
					</Text>
				)}
				{channel && (
					<Text size={Text.Sizes.SIZE_16} className={marginBottom20}>
						{user.username} was last seen in{' '}
						{guild ? (
							<Mention
								iconType='text'
								onClick={() => {
									transitionTo?.(constants.Routes.CHANNEL(guild.id, channel.id));
									close();
								}}
							>
								{channel.name}
							</Mention>
						) : channel.recipients.length <= 2 ? (
							'your DMs'
						) : (
							channel.name
						)}
					</Text>
				)}
				<Text size={Text.Sizes.SIZE_16} className={marginBottom20}>
					Favorite friend since {new Date(friend.since).toLocaleDateString()} {new Date(friend.since).toLocaleTimeString()}
				</Text>
				<Text size={Text.Sizes.SIZE_16} className={marginBottom20}>
					Joined discord on {user.createdAt.toLocaleDateString()} {user.createdAt.toLocaleTimeString()}
				</Text>
			</div>
		</ConfirmModal>
	);
};
