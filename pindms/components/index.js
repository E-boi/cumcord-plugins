import { webpack } from '@cumcord/modules';

export const Tooltip = webpack.findByProps('TooltipContainer').TooltipContainer;
export const Arrow = webpack.findByDisplayName('Arrow');
export const Clickable = webpack.findByDisplayName('Clickable');
export const Modal = webpack.findByProps('ModalRoot');
export const Pin = webpack.findByDisplayName('Pin');
export const FormTitle = webpack.findByDisplayName('FormTitle');
export const Button = webpack.find(m => m.DropdownSizes);
export const ListSectionItem = webpack.findByDisplayName('ListSectionItem');

const modal = webpack.findByProps('openModalLazy');
let currentOpenModal;

export const open = component =>
  (currentOpenModal = modal.openModal(e => {
    component.props = { ...component.props, ...e };
    return component;
  }));

export const close = () => modal.closeModal(currentOpenModal);
