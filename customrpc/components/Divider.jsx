import { webpack } from '@cumcord/modules';

const divider = webpack.findByProps('dividerDefault').dividerDefault;

const FormDivider = webpack.findByDisplayName('FormDivider');

export default ({ className }) => <FormDivider className={[divider, className].join(' ')} />;
