import { webpack } from '@cumcord/modules';
import Divider from './Divider';
import { Flex, FormItem, FormText } from './WPMODULES';

const classes = {
  ...webpack.findByProps('marginBottom20'),
  ...webpack.findByProps('formText'),
  ...Flex,
};

export default props => (
  <FormItem title={props.title} required={props.required} className={[classes.marginBottom20, props.className].join(' ')}>
    {props.children}
    {props.note && <FormText className={`${classes.description} ${classes.marginTop8}`}>{props.note}</FormText>}
    {props.divider && <Divider className={[classes.marginTop20].join(' ')} />}
  </FormItem>
);
