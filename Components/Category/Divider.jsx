import { webpack } from '@cumcord/modules';

const classes = {
	divider: webpack.findByPropsAll('divider')[1].divider,
	dividerDefault: webpack.findByProps('dividerDefault').dividerDefault,
};

export default ({ className }) => <div className={`${classes.divider} ${classes.dividerDefault} ${className}`} />;
