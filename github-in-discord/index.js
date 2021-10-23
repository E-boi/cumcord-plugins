import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';
import { React } from '@cumcord/modules/common';
import { open } from './components';
import Modal from './components/Modal';
import css from './style.css';
import settings from './settings';

const Menu = webpack.findByProps('MenuGroup', 'MenuItem');
const MessageContext = webpack.find(m => m.default?.displayName === 'MessageContextMenu');
const ghregex = /^https?:\/\/(www.)?github.com\/[\w-]+\/[\w-]+\/?/;
let injection;
let cssInject;

export default ({ persist }) => {
	return {
		onLoad() {
			cssInject = css();
			injection = after('default', MessageContext, ([{ message, target }], res) => {
				if (!message.content.includes('https://github.com/') || !message.content.includes('https://github.com/')) return;
				const url = target.href?.match(ghregex)?.[0] || extractURL(message.content);
				if (url.split('/').length < 5) return res;
				if (!findInReactTree(res, c => c?.props?.id === 'githubModal')) {
					res.props.children.splice(
						4,
						0,
						React.createElement(
							Menu.MenuGroup,
							null,
							React.createElement(Menu.MenuItem, {
								action: () => open(() => React.createElement(Modal, { url: `${url.split('/')[3]}/${url.split('/')[4]}`, key: persist.ghost.apikey })),
								id: 'githubModal',
								label: 'Open',
							})
						)
					);
				}
				return res;
			});
			MessageContext.default.displayName = 'MessageContextMenu';
		},
		onUnload() {
			cssInject?.();
			injection?.();
		},
		settings: React.createElement(settings, { persist }),
	};
};

function extractURL(url) {
	const extracted = url
		.replace('tree', 'blob')
		.replace(/(?:\n|<|>|\*|_|`)/g, ' ')
		.split(' ')
		.filter(e => e.match(ghregex));

	return extracted[0];
}
