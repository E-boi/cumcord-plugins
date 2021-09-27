import { after } from '@cumcord/patcher';
import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import { showToast } from '@cumcord/ui/toasts';
import css from './style.css';

let injection;
let cssInject;

export default () => {
	const ChannelItem = webpack.find(m => m.default?.displayName === 'ChannelItem');
	const { copy } = webpack.findByProps('clipboard').clipboard;

	return {
		onLoad() {
			cssInject = css();
			injection = after('default', ChannelItem, ([{ channel }], res) => {
				res.props.children.props.children[1].props.children[1].props.children.unshift(
					React.createElement(LinkIcon, {
						onClick: () => {
							copy(`<#${channel.id}>`);
							showToast({ title: `Copied mention for #${channel.name}`, duration: 3000 });
						},
					})
				);
				return res;
			});

			ChannelItem.default.displayName = 'ChannelItem';
		},
		onUnload() {
			cssInject?.();
			injection?.();
		},
	};
};

class LinkIcon extends React.Component {
	render() {
		const classes = webpack.findByProps('iconItem');
		const Icon = webpack.findByDisplayName('Link');
		const { TooltipContainer } = webpack.findByProps('TooltipContainer');
		return React.createElement(
			TooltipContainer,
			{
				className: classes.iconItem,
				text: 'Copy Channel',
				position: 'top',
				color: 'black',
			},
			React.createElement(
				'div',
				{
					className: 'linkChannels',
				},
				React.createElement('svg', {
					className: classes.actionIcon,
					viewBox: '0 0 20 20',
					onClick: this.props.onClick,
					children: React.createElement(Icon, { height: '20' }),
				})
			)
		);
	}
}
