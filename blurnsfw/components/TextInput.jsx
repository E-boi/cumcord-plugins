import { webpack } from '@cumcord/modules';
import FormItem from './FormItem';

const Input = webpack.findByDisplayName('TextInput');

export default props => {
	if (!Array.isArray(props.children)) props.children = [props.children];
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title[0]} required={props.required} note={props.note}>
			{title[1] ? (
				<div className='blurnsfwsetting-textinput'>
					<Input {...props} />
					{title[1]}
				</div>
			) : (
				<Input {...props} />
			)}
		</FormItem>
	);
};
