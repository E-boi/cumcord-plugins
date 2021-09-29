import { webpack } from '@cumcord/modules';
import { Divider } from '../components';

const Input = webpack.findByDisplayName('TextInput');
const FormItem = webpack.findByDisplayName('FormItem');
const classes = {
	...webpack.findByProps('marginBottom20'),
};

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} required={props.required} className={classes.marginBottom20}>
			<Input {...props} />
			<Divider className={[classes.marginTop20, classes.marginBottom20].join(' ')} />
		</FormItem>
	);
};
