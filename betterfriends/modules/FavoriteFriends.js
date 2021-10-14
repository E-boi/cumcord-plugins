import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { React } from '@cumcord/modules/common';
import FavoriteFriend from '../components/FavoriteFriend';
import { Keyboard, open, Tooltip } from '../components';
import InformationModal from '../components/InformationModal';

const ChannelList = webpack.find(m => m.default?.displayName === 'ConnectedPrivateChannelsList');
const PrivateChannel = webpack.findByDisplayName('PrivateChannel').prototype;
const { getChannel } = webpack.findByProps('getChannel');
const { DirectMessage } = webpack.findByProps('DirectMessage');
const { getDMFromUserId } = webpack.findByProps('getDMFromUserId');

export default function () {
	this.expanded = false;

	this.injections['FavoriteFriends'].push(
		after('render', PrivateChannel, (_, res) => {
			const userId = res.props.subText?._owner?.pendingProps?.channel?.recipients?.[0];
			if (userId && this.FAVORITE_FRIENDS.some(f => f.id === userId)) {
				if (!res.props.className.includes('ccbf-favoritefriend')) res.props.className += ' ccbf-favoritefriend';
				res.props.children = [
					React.createElement(
						Tooltip,
						{ text: 'User Information', position: 'top' },
						React.createElement(Keyboard, {
							className: 'ccbf-information',
							onClick: e => {
								e.stopPropagation();
								e.preventDefault();
								const info = this.FRIEND_DATA.lastMessageID[userId];
								open(() =>
									React.createElement(InformationModal, {
										user: userId,
										channel: info?.channel,
										friend: this.FAVORITE_FRIENDS.find(f => f.id === userId),
									})
								);
							},
						})
					),
					res.props.children,
				];
			}
			return res;
		})
	);

	this.injections['FavoriteFriends'].push(
		after('default', ChannelList, (_, res) => {
			res.props.privateChannelIds = res.props.privateChannelIds.filter(c => {
				const channel = getChannel(c);
				return channel.type !== 1 || !this.FAVORITE_FRIENDS.some(f => channel.recipients[0] === f.id);
			});

			if (res.props.children.find(x => x?.toString()?.includes('this.expanded&&t.React.createElement'))) return res;

			const header = React.createElement(FavoriteFriend, { _this: this, expanded: this.expanded, friends: this.FAVORITE_FRIENDS });

			const dms = this.FAVORITE_FRIENDS.map(
				f => () =>
					getChannel(getDMFromUserId(f.id)) &&
					!this.expanded &&
					React.createElement(DirectMessage, {
						'aria-posinset': 7,
						'aria-setsize': 54,
						tabIndex: -1,
						channel: getChannel(getDMFromUserId(f.id)),
						selected: res.props.selectedChannelId === getDMFromUserId(f.id),
					})
			);
			res.props.children.push(() => header, ...dms);
			return res;
		})
	);

	ChannelList.default.displayName = 'ConnectedPrivateChannelsList';
}
