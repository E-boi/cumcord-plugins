import { webpack } from '@cumcord/modules';
import FormItem from './FormItem';

const CheckBox = webpack.findByDisplayName('Checkbox');

export default props => {
	if (!props.checkboxes) props.checkboxes = [false];
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title} note={props.note}>
			<div style={{ display: 'flex' }}>
				{props.checkboxes.map((c, i) => (
					<CheckBox checked={c} onChange={() => props.onChange?.(i)} />
				))}
			</div>
		</FormItem>
	);
};
