import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { React, i18n, constants } from '@cumcord/modules/common';
import { ArrowDown, ArrowUp, Tooltip } from '../components';
import GuildIcon from '../components/GuildIcon';
import FriendListTitle from '../components/FriendListTitle';

const { Messages } = i18n;
const { RelationshipTypes, StatusTypes } = constants;
const TabBar = webpack.findByDisplayName('TabBar').prototype;
const FriendRow = webpack.findByDisplayName('FriendRow').prototype;
const { getRelationships } = webpack.findByProps('getRelationships');
const { getStatus } = webpack.findByProps('getStatus');
const PeopleListSectionedNonLazy = webpack.find(m => m.default?.displayName === 'PeopleListSectionedNonLazy');
const statusSortOrder = {
	online: 0,
	streaming: 1,
	idle: 2,
	dnd: 3,
	offline: 4,
	invisible: 5,
	unknown: 6,
};

export default function () {
	this.sortKey = '';
	this.sortReversed = false;
	this.searchQuery = '';

	const _injectTabBar = () => {
		console.log(TabBar);
		this.injections['FriendsList'].push(
			after('render', TabBar, (_, res) => {
				if (res.props['aria-label'] !== Messages.FRIENDS) return res;
				const relationships = getRelationships();
				const onlineCount = Object.entries(relationships).filter(
					r => r[1] === RelationshipTypes.FRIEND && getStatus(r[0]) !== StatusTypes.OFFLINE
				).length;
				const allCount = Object.values(relationships).filter(r => r === RelationshipTypes.FRIEND).length;
				const pendingIncoming = Object.values(relationships).filter(r => r === RelationshipTypes.PENDING_INCOMING).length;
				const pendingOutcoming = Object.values(relationships).filter(r => r === RelationshipTypes.PENDING_OUTGOING).length;
				const blockedCount = Object.values(relationships).filter(r => r === RelationshipTypes.BLOCKED).length;
				res.props.children.forEach(children => {
					switch (children.props.id) {
						case 'ONLINE':
							children.props.children += ` - ${onlineCount}`;
							break;
						case 'ALL':
							children.props.children += ` - ${allCount}`;
							break;
						case 'PENDING':
							if (!Array.isArray(children.props.children)) children.props.children = [(children.props.children += ' - ')];
							else children.props.children[1] = null;
							children.props.children.push(
								React.createElement(Tooltip, {
									text: 'Incoming',
									position: 'bottom',
									children: React.createElement(ArrowDown, { className: 'bfl-down', height: '20' }),
								}),
								pendingIncoming,
								React.createElement(Tooltip, {
									text: 'Outgoing',
									position: 'bottom',
									children: React.createElement(ArrowUp, { className: 'bfl-down', height: '20' }),
								}),
								pendingOutcoming
							);
							break;
						case 'BLOCKED':
							children.props.children += ` - ${blockedCount}`;
							break;
					}
				});
				return res;
			})
		);
	};

	const _injectFriendRow = () => {
		this.injections['FriendsList'].push(
			after('render', FriendRow, (_, res) => {
				const childrenRenderer = res.props.children;
				const mutualGuilds = res._owner.stateNode.props.mutualGuilds;
				res.props.children = (...args) => {
					const children = childrenRenderer(...args);
					children.props.children.splice(1, 0, React.createElement('div', { className: 'ccbf-mutualGuilds ccbf-container' }));
					mutualGuilds.forEach(guild => {
						const Icon = React.createElement(GuildIcon, { guild });
						if (!children.props.children[1].props.children) children.props.children[1].props.children = [Icon];
						else children.props.children[1].props.children.unshift(Icon);
					});
					return children;
				};
				return res;
			})
		);
	};

	const _injectPeopleList = () => {
		this.injections['FriendsList'].push(
			after('default', PeopleListSectionedNonLazy, (_, res) => {
				const childrenRenderer = res.props.children.props.children;
				res.props.children.props.children = (...args) => {
					const children = childrenRenderer(...args);
					const props = children.props.children[0].props.children[0].props;
					props.title = [React.createElement(FriendListTitle, { title: props.title, _this: this })];

					children.props.children[0].props.children = children.props.children[0].props.children.map(section => {
						if (section.props) return section;
						if (this.sortKey) {
							section = section.map(user => {
								user.statusIndex = statusSortOrder[user.props.status];
								user.isFavorite = this.FAVORITE_FRIENDS.some(f => f.id === user.key);
								return user;
							});
							if (this.sortKey === 'isFavorite') section = section.filter(u => u[this.sortKey]);
							section.sort((x, y) => {
								let xValue = this.sortKey === 'statusIndex' ? x[this.sortKey] : x.props[this.sortKey],
									yValue = this.sortKey === 'statusIndex' ? y[this.sortKey] : y.props[this.sortKey];
								return xValue < yValue ? -1 : xValue > yValue ? 1 : 0;
							});
						}
						if (this.searchQuery) section = section.filter(u => u.props.usernameLower.includes(this.searchQuery));
						if (this.sortReversed) section.reverse();
						return section;
					});
					return children;
				};
				return res;
			})
		);

		PeopleListSectionedNonLazy.default.displayName = 'PeopleListSectionedNonLazy';
	};

	this.settings.get('showtotal') && _injectTabBar();
	this.settings.get('mutualguilds') && _injectFriendRow();
	this.settings.get('sortoptions') && _injectPeopleList();
}
