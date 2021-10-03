import { webpack } from '@cumcord/modules';
import FormItem from './FormItem';

const Input = webpack.findByDisplayName('TextInput');

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} required={props.required} note={props.note}>
			<Input {...props} />
		</FormItem>
	);
};
