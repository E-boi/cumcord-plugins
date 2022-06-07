import { webpack } from '@cumcord/modules';
import Divider from './Divider';

const Text = webpack.findByDisplayName('LegacyText'),
	ArrowDown = webpack.findByDisplayName('ArrowDropDown'),
	ArrowUp = webpack.findByDisplayName('ArrowDropUp');
const classes = {
	...webpack.findByProps('wrapper', 'base'),
	...webpack.findByProps('flex'),
	...webpack.findByProps('size20'),
	...webpack.findByProps('marginBottom20'),
	...webpack.findByProps('dividerDefault'),
};

export default ({ opened, children, title, onChange }) => {
	return (
		<div>
			<div onClick={() => onChange?.()} className={[classes.flex, classes.alignCenter, classes.marginBottom8].join(' ')}>
				{opened ? <ArrowUp className={classes.base} width={32} height={32} /> : <ArrowDown className={classes.base} width={32} height={32} />}
				<Text className={[classes.base, classes.size16, classes.marginLeft8].join(' ')}>{title}</Text>
			</div>
			{opened ? <div className={[classes.marginLeft8, classes.marginBottom20].join(' ')}>{[...children]}</div> : null}
			{!opened && <Divider className={classes.marginBottom20} />}
		</div>
	);
};
