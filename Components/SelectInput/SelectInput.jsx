import { webpack } from '@cumcord/modules';
import FormItem from './FormItem';

const SelectTempWrapper = webpack.findByDisplayName('SelectTempWrapper');

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} note={props.note} required={props.required}>
			<SelectTempWrapper {...props} />
		</FormItem>
	);
};
