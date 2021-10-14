import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
const modal = webpack.findByProps('push', 'popWithKey');

export const Tooltip = webpack.findByProps('TooltipContainer').TooltipContainer;
export const ArrowDown = webpack.findByDisplayName('ArrowDropDown');
export const ArrowUp = webpack.findByDisplayName('ArrowDropUp');
export const Keyboard = props =>
	React.createElement('span', { ...props, className: `${props.className || ''} ${webpack.findByProps('editIcon').editIcon}` });
export const ConfirmModal = webpack.findByDisplayName('ConfirmModal');
export const Text = webpack.findByDisplayName('Text');
export const Mention = webpack.findByDisplayName('Mention');

export const open = component => modal.push(() => React.createElement(component));

export const close = () => modal.pop();
