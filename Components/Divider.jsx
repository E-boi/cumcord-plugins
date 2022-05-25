import { webpack } from '@cumcord/modules';
import { FormDivider } from './WPMODULES';

const divider = webpack.findByProps('dividerDefault').dividerDefault;

export default ({ className }) => <FormDivider className={[divider, className].join(' ')} />;
