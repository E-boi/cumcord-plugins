import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';

const components = {
	Input: webpack.findByDisplayName('TextInput'),
	SwitchItem: webpack.findByDisplayName('SwitchItem'),
	Text: webpack.findByDisplayName('Text'),
	UserPopout: webpack.findByDisplayName('UserActivitySection'),
	FormItem: webpack.findByDisplayName('FormItem'),
	ArrowDown: webpack.findByDisplayName('ArrowDropDown'),
	ArrowUp: webpack.findByDisplayName('ArrowDropUp'),
	SelectTempWrapper: webpack.findByDisplayName('SelectTempWrapper'),
	Divider: ({ className }) => React.createElement('div', { className: `divider-3573oO dividerDefault-3rvLe- ${className}` }),
};

export const Input = components.Input;
export const SwitchItem = components.SwitchItem;
export const Text = components.Text;
export const UserPopout = components.UserPopout;
export const FormItem = components.FormItem;
export const ArrowDown = components.ArrowDown;
export const ArrowUp = components.ArrowUp;
export const SelectTempWrapper = components.SelectTempWrapper;
export const Divider = components.Divider;

export default components;
