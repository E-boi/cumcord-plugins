import { webpack } from '@cumcord/modules';

const classes = {
  dividerDefault: webpack.findByProps('dividerDefault').dividerDefault,
  divider: webpack.find(m => m.divider?.includes('divider-_')).divider,
};

export default ({ className }) => <div className={`${classes.divider} ${classes.dividerDefault} ${className}`} />;
