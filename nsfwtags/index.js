import { after } from '@cumcord/patcher';
import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import css from './style.css';

let injection;
let cssInject;

export default () => {
	const ChannelItem = webpack.find(m => m.default?.displayName === 'ChannelItem');

	return {
		onLoad() {
			cssInject = css();
			injection = after('default', ChannelItem, ([{ channel }], res) => {
				if (!channel.nsfw) return;
				res.props.children.props.children[1].props.children[1].props.children.push(
					React.createElement('div', { className: 'nsfw-badge' }, React.createElement('div', { className: 'nsfw-text' }, 'NSFW'))
				);
			});

			ChannelItem.default.displayName = 'ChannelItem';
		},
		onUnload() {
			cssInject?.();
			injection?.();
		},
	};
};
