import { webpack } from '@cumcord/modules';
import { FormItem, Input } from '.';
import Divider from './Divider';

const classes = {
  ...webpack.findByProps('marginBottom20'),
};

export default props => {
  const title = props.children;
  delete props.children;
  return (
    <FormItem title={title} required={props.required} className={classes.marginBottom20}>
      <Input {...props} />
      {!props.noDivider && <Divider className={[classes.marginTop20, classes.marginBottom20].join(' ')} />}
    </FormItem>
  );
};
