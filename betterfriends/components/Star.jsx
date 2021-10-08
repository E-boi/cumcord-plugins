import { webpack } from '@cumcord/modules';
import { Tooltip } from '.';

const classes = {
	...webpack.findByProps('topSection'),
};

export default ({ header }) => {
	return (
		<div className={`ccbf-badge ${classes.topSection}`}>
			<Tooltip className={`cssbf-star-tooltip`} text='Favorited Friend' position='top'>
				<div className={`${!header && 'ccbf-star-member'} ccbf-star`}></div>
			</Tooltip>
		</div>
	);
};
