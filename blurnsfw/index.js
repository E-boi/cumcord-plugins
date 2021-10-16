import { after } from '@cumcord/patcher';
import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import css from './style.css';
import settings from './settings';

const injections = [];
let cssInject;
const ChannelItem = webpack.find(m => m.default?.displayName === 'ChannelItem');
const ChannelTextAera = webpack.find(m => m.type && m.type.render && m.type.render.displayName === 'ChannelTextAreaContainer');

export default ({ persist }) => {
	return {
		onLoad() {
			cssInject = css();
			injections.push(
				after('default', ChannelItem, ([{ channel }], res) => {
					if (!channel.nsfw || persist.ghost.notags) return;
					res.props.children.props.children[1].props.children[1].props.children.push(
						React.createElement('div', { className: 'nsfw-badge' }, React.createElement('div', { className: 'nsfw-text' }, 'NSFW'))
					);
				})
			);

			injections.push(
				after('render', ChannelTextAera.type, ([{ channel }], res) => {
					if (persist.ghost.blocked?.includes(channel.id) || persist.ghost.blocked?.includes(channel.recipients[0])) return res;
					else if (
						channel.nsfw ||
						(channel.type === 1 && persist.ghost.dm) ||
						(channel.type === 3 && persist.ghost.gc) ||
						persist.ghost.blurChannels?.includes(channel.id) ||
						persist.ghost.blurChannels?.includes(channel.recipients[0])
					)
						blurChannel(persist.ghost);
					else document.body.classList.remove('blur');

					return res;
				})
			);

			ChannelItem.default.displayName = 'ChannelItem';
		},
		onUnload() {
			cssInject?.();
			injections.forEach(i => i());
		},
		settings: React.createElement(settings, { persist }),
	};
};

function blurChannel(store) {
	const blur = store.blur || 10;
	const timing = store.timing || 1;
	const element = document.body;
	element.style.setProperty('--blur-effect', `blur(${blur}px)`);
	element.style.setProperty('--blur-timing', `${timing}s`);
	element.classList.add('blur');
}
