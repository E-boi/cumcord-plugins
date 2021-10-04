import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';

export const Tooltip = webpack.findByProps('TooltipContainer').TooltipContainer;
const modal = webpack.findByProps('push', 'popWithKey');

export const open = component => modal.push(() => React.createElement(component));
export const close = () => modal.pop();

export const Modal = webpack.findByDisplayName('DeprecatedModal');
export const FormTitle = webpack.findByDisplayName('FormTitle');
export const Card = webpack.findByDisplayName('Card');
export const Button = webpack.find(m => m.DropdownSizes);
export const Text = webpack.findByDisplayName('Text');
export const Pencil = webpack.findByDisplayName('Pencil');
