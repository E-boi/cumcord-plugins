import { webpack } from '@cumcord/modules';
import { Tooltip } from '.';

const classes = {
	...webpack.findByProps('iconContainer'),
};
const Icon = webpack.findByProps('GuildIcon').GuildIcon;

export default ({ guild }) => {
	return (
		<Tooltip text={guild.name} position='top'>
			<div className={`${classes.iconContainer} ccbf-icon`}>
				<Icon animate={true} size={Icon.Sizes.LARGE} guild={guild} />
			</div>
		</Tooltip>
	);
};
