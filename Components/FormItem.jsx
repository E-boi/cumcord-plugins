import { webpack } from '@cumcord/modules';
import Divider from './Divider';
import { Flex, FormItem, FormText } from './WPMODULES';

const classes = {
  ...webpack.findByProps('marginBottom20'),
  ...webpack.findByProps('formText'),
  ...Flex,
};

export default ({ title, required, className, note, divider = true, children } = {}) => (
  <FormItem title={title} required={required} className={[classes.marginBottom20, className].join(' ')}>
    {children}
    {note && <FormText className={`${classes.description} ${classes.marginTop8}`}>{note}</FormText>}
    {divider && <Divider className={[classes.marginTop20].join(' ')} />}
  </FormItem>
);
