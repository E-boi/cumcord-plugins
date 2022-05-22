import { Flex, FormItem, SelectTempWrapper } from '.';
import { webpack } from '@cumcord/modules';
import Divider from './Divider';

const classes = {
  ...webpack.findByProps('marginBottom20'),
};

export default props => {
  if (!Array.isArray(props.children)) props.children = [props.children];
  const title = props.children[0];
  props.children.splice(0, 1);
  const others = props.children.map(
    c =>
      c && (
        <Flex.Child className='crpc-lowerMargin' grow={0} shrink={0} wrap>
          {c}
        </Flex.Child>
      )
  );
  delete props.children;
  return (
    <FormItem title={title} className={classes.marginBottom20} required={props.required}>
      {others.length ? (
        <Flex>
          <Flex.Child grow={1} shrink={1} wrap>
            <SelectTempWrapper {...props} />
          </Flex.Child>
          {[...others]}
        </Flex>
      ) : (
        <SelectTempWrapper {...props} />
      )}
      {!props.noDivider && <Divider className={[classes.marginTop20, classes.marginBottom20].join(' ')} />}
    </FormItem>
  );
};
