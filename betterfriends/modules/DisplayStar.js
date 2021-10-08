import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { React } from '@cumcord/modules/common';
import Star from '../components/Star';

const MessageTimestamp = webpack.find(m => m.default?.name === 'b' && !m.default?.displayName); // weird way to get it
const MemberList = webpack.findByDisplayName('MemberListItem').prototype;

export default function () {
	if (!this.settings.get('displaystar')) return;

	const isFavorite = id => this.FAVORITE_FRIENDS.some(u => u.id === id);

	this.injections['DisplayStar'].push(
		after('renderDecorators', MemberList, (_, res) => {
			if (!isFavorite(res._owner.pendingProps.user?.id)) return res;
			res.props.children.unshift(React.createElement(Star));
			return res;
		})
	);

	this.injections['DisplayStar'].push(
		after('default', MessageTimestamp, ([{ message }], res) => {
			if (!isFavorite(message?.author?.id)) return res;
			res.props.children[1].props.children.push(React.createElement(Star, { header: true }));
			return res;
		})
	);
}
