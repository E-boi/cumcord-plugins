import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';

const modal = webpack.findByProps('push', 'popWithKey');

export const open = component => modal.push(() => React.createElement(component));

export const close = () => modal.pop();

export const Modal = webpack.findByDisplayName('DeprecatedModal');
export const Text = webpack.findByDisplayName('Text');
export const Button = webpack.find(m => m.DropdownSizes);
export const Spinner = webpack.findByDisplayName('Spinner');
export const StarSvg = 'https://raw.githubusercontent.com/E-boi/assets/main/star.svg';
export const ForkSvg = 'https://raw.githubusercontent.com/E-boi/assets/main/ghfork.svg';
export const FolderIcon = 'https://raw.githubusercontent.com/E-boi/assets/main/folder.svg';
export const FileIcon = 'https://raw.githubusercontent.com/E-boi/assets/main/ghfile.svg';
export const Arrow = webpack.findByDisplayName('Arrow');
