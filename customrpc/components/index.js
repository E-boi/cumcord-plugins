import { findByDisplayName, findByProps, find } from '@cumcord/modules/webpack';

export const Input = findByDisplayName('TextInput');
export const SwitchItem = findByDisplayName('SwitchItem');
export const Text = findByDisplayName('Text') || findByDisplayName('LegacyText');
export const Header = findByProps('Sizes', 'Tags');
export const ActivityContainer = findByDisplayName('UserActivityContainer');
export const FormItem = findByDisplayName('FormItem');
export const ArrowDown = findByDisplayName('ArrowDropDown');
export const ArrowUp = findByDisplayName('ArrowDropUp');
export const SelectTempWrapper = findByDisplayName('SelectTempWrapper');
export const Button = find(m => m.DropdownSizes);
export const Flex = findByDisplayName('Flex');
export const { ScrollerThin } = findByProps('ScrollerThin');
export const SlideIn = findByDisplayName('SlideIn');
export const Notice = findByDisplayName('SettingsNotice');
export const TransitionGroup = findByDisplayName('TransitionGroup');
export const Modal = findByProps('ModalRoot');

const modal = findByProps('openModalLazy');

export const open = component =>
  modal.openModal(e => {
    component.props = { ...component.props, ...e };
    return component;
  });
