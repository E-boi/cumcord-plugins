import { webpack } from '@cumcord/modules';

const classes = {
	dividerDefault: webpack.findByProps('dividerDefault').dividerDefault,
};

export default ({ className }) => <div className={`divider-3573oO ${classes.dividerDefault} ${className}`} />;
