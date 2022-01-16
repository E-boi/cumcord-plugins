import { webpack } from '@cumcord/modules';

export const Tooltip = webpack.findByProps('TooltipContainer').TooltipContainer;
const modal = webpack.findByProps('openModalLazy');
let currentOpenModal;

export const open = async component =>
  (currentOpenModal = modal.openModal(e => {
    component.props = { ...component.props, ...e };
    return component;
  }));

export const close = () => modal.closeModal(currentOpenModal);

export const Modal = webpack.findByProps('ModalRoot');
export const FormTitle = webpack.findByDisplayName('FormTitle');
export const Card = webpack.findByDisplayName('Card');
export const Button = webpack.find(m => m.DropdownSizes);
export const Text = webpack.findByDisplayName('Text');
export const Pencil = webpack.findByDisplayName('Pencil');
