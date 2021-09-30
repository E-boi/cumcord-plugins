import { webpack } from '@cumcord/modules';
import { constants } from '@cumcord/modules/common';
import Divider from './Divider';

const ColorInput = webpack.findByDisplayName('ColorPicker');
const FormItem = webpack.findByDisplayName('FormItem');
const classes = {
	...webpack.findByProps('marginBottom20'),
};

const ColorPicker = props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} required={props.required} className={classes.marginBottom20}>
			<ColorInput {...{ ...props, colors: constants.ROLE_COLORS }} />
			<Divider />
		</FormItem>
	);
};

ColorPicker.utils = {
	...webpack.findByProps('isValidHex'),
};

export default ColorPicker;
