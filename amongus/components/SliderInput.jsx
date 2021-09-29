import { webpack } from '@cumcord/modules';
import Divider from './Divider';

const FormItem = webpack.findByDisplayName('FormItem');
const Slider = webpack.findByDisplayName('Slider');
const classes = {
	...webpack.findByProps('marginBottom20'),
};

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} required={props.required} className={classes.marginBottom8}>
			<Slider {...{ ...props, className: `${props.className} ${classes.marginTop8}` }} />
			<Divider />
		</FormItem>
	);
};
