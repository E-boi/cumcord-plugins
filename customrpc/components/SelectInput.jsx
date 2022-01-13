import { FormItem, SelectTempWrapper } from '../components';
import { webpack } from '@cumcord/modules';
import Divider from './Divider';

const classes = {
	...webpack.findByProps('marginBottom20'),
};

export default props => {
	if (!Array.isArray(props.children)) props.children = [props.children];
	const title = props.children;
	delete props.children;
	return (
		<FormItem title={title[0]} className={classes.marginBottom20} required={props.required}>
			{title[1] ? (
				<div className='rpcsetting-select'>
					<SelectTempWrapper {...props} />
					{title[1]}
				</div>
			) : (
				<SelectTempWrapper {...props} />
			)}
			<Divider className={[classes.marginTop20, classes.marginBottom20].join(' ')} />
		</FormItem>
	);
};
