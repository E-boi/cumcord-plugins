import { webpack } from '@cumcord/modules';

const modal = webpack.findByProps('openModalLazy');
let currentOpenModal;

export const open = async component =>
  (currentOpenModal = modal.openModal(e => {
    component.props = { ...component.props, ...e };
    return component;
  }));

export const close = () => modal.closeModal(currentOpenModal);

export const Modal = webpack.findByProps('ModalRoot');
export const Text = webpack.findByDisplayName('Text') || webpack.findByDisplayName('LegacyText');
export const Button = webpack.find(m => m.DropdownSizes);
export const Spinner = webpack.findByDisplayName('Spinner');
export const StarSvg = 'https://raw.githubusercontent.com/E-boi/assets/main/star.svg';
export const ForkSvg = 'https://raw.githubusercontent.com/E-boi/assets/main/ghfork.svg';
export const FolderIcon = 'https://raw.githubusercontent.com/E-boi/assets/main/folder.svg';
export const FileIcon = 'https://raw.githubusercontent.com/E-boi/assets/main/ghfile.svg';
export const Arrow = webpack.findByDisplayName('Arrow');
