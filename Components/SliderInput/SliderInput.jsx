import { webpack } from '@cumcord/modules';
import FormItem from './FormItem';

const Slider = webpack.findByDisplayName('Slider');
const classes = {
	...webpack.findByProps('marginBottom20'),
};

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} note={props.note} required={props.required}>
			<Slider {...{ ...props, className: `${props.className} ${classes.marginTop8}` }} />
		</FormItem>
	);
};
