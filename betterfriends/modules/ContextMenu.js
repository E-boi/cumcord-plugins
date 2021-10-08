import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';

const { getRelationships } = webpack.findByProps('getRelationships');
const { MenuItem } = webpack.findByProps('MenuGroup', 'MenuItem');
const ContextMenus = ['DMUserContextMenu', 'GroupDMUserContextMenu', 'GuildChannelUserContextMenu'];

// function updateList() {
// 	document.querySelector(`.scroller-1JbKMe`).dispatchEvent(new Event('focusin'));
// 	setTimeout(() => document.querySelector(`.scroller-1JbKMe`).dispatchEvent(new Event('focusout')), 100);
// }

export default function () {
	const isFriend = id => getRelationships()[id] === 1;
	const isFavorite = id => this.FAVORITE_FRIENDS.some(u => u.id === id);
	ContextMenus.forEach(menu => {
		const ContextMenu = webpack.find(m => m.default?.displayName === menu);

		this.injections['ContextMenu'].push(
			after('default', ContextMenu, ([{ user }], res) => {
				if (isFriend(user.id)) {
					const group = findInReactTree(res, c => Array.isArray(c) && c.find(item => item && item.props && item.props.id === 'block'));
					if (!isFavorite(user.id))
						group.push(
							React.createElement(MenuItem, {
								id: 'ccbf-add',
								label: 'Add as Favorite',
								action: () => {
									this.FAVORITE_FRIENDS.push({ id: user.id, since: Date.now() });
									this.settings.set('favfriends', this.FAVORITE_FRIENDS);
									this.reload('ContextMenu');
									// updateList();
								},
							})
						);
					else
						group.push(
							React.createElement(MenuItem, {
								id: 'ccbf-remove',
								label: 'Remove Favorite',
								action: () => {
									this.FAVORITE_FRIENDS = this.FAVORITE_FRIENDS.filter(u => u.id !== user.id);
									this.settings.set('favfriends', this.FAVORITE_FRIENDS);
									this.reload('ContextMenu');
									// updateList();
								},
							})
						);
				}
				return res;
			})
		);

		ContextMenu.default.displayName = menu;
	});
}
