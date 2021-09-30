import { webpack } from '@cumcord/modules';
import Divider from './Divider';

const Input = webpack.findByDisplayName('TextInput');
const FormItem = webpack.findByDisplayName('FormItem');
const classes = {
	...webpack.findByProps('marginBottom20'),
};

export default props => {
	const children = [props.children];
	delete props.children;
	return (
		<FormItem title={props.title} required={props.required} className={classes.marginBottom20}>
			<div className='cumstyles-textinput'>
				<Input {...props} />
				{children}
			</div>
			<Divider className={[classes.marginTop20, classes.marginBottom20].join(' ')} />
		</FormItem>
	);
};
