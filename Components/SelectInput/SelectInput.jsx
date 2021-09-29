import { webpack } from '@cumcord/modules';
import Divider from './Divider';

const FormItem = webpack.findByDisplayName('FormItem'),
	SelectTempWrapper = webpack.findByDisplayName('SelectTempWrapper');

const classes = {
	...webpack.findByProps('marginBottom20'),
};

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} className={webpack.findByProps('marginBottom20').marginBottom20} required={props.required}>
			<SelectTempWrapper {...props} />
			<Divider className={[classes.marginTop20, classes.marginBottom20].join(' ')} />
		</FormItem>
	);
};
