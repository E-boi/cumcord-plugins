import { webpack } from '@cumcord/modules';
import FormItem from './FormItem';

const CalendarPicker = webpack.findByDisplayName('CalendarPicker');

export default props => {
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} required={props.required} note={props.note}>
			<CalendarPicker {...props} />
		</FormItem>
	);
};
