import { webpack } from '@cumcord/modules';
import FormItem from './FormItem';

const RadioGroup = webpack.findByDisplayName('RadioGroup');
const classes = {
	...webpack.findByProps('marginBottom20'),
};

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} note={props.note} required={props.required}>
			<RadioGroup {...{ ...props, className: `${props.className} ${classes.marginTop8}` }} />
		</FormItem>
	);
};
