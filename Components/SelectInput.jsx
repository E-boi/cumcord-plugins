import FormItem from './FormItem';
import { Flex, SelectTempWrapper } from './WPMODULES';

export default function SelectInput(props) {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  const className = props.className ? `${props.className} cccumpo` : 'cccumpo';
  delete props.children;
  delete props.className;
  return (
    <FormItem title={props.title} divider={props.divider ?? true} className={className} note={props.note} required={props.required}>
      <Flex basis='auto' grow={1} shrink={1}>
        <SelectTempWrapper {...props} />
        {[...children]}
      </Flex>
    </FormItem>
  );
}
