import FormItem from './FormItem';
import { DTextInput, Flex } from './WPMODULES';

export default function TextInput(props) {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  const className = props.className ? `${props.className} cccumpo` : 'cccumpo';
  delete props.children;
  delete props.className;
  return (
    <FormItem title={props.title} divider={props.divider ?? true} className={className} required={props.required} note={props.note}>
      <Flex basis='auto' grow={1} shrink={1}>
        <DTextInput {...props} />
        {[...children]}
      </Flex>
    </FormItem>
  );
}
