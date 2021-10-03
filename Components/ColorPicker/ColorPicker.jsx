import { webpack } from '@cumcord/modules';
import { constants } from '@cumcord/modules/common';
import FormItem from './FormItem';

const ColorInput = webpack.findByDisplayName('ColorPicker');

const ColorPicker = props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} note={props.note} required={props.required}>
			<ColorInput {...{ ...props, colors: constants.ROLE_COLORS }} />
		</FormItem>
	);
};

ColorPicker.utils = {
	...webpack.findByProps('isValidHex'),
};

export default ColorPicker;
