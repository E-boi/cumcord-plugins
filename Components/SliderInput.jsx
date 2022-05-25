import FormItem from './FormItem';
import { Flex, Slider } from './WPMODULES';

export default function SliderInput(props) {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  const className = props.className ? `${props.className} cccumpo` : 'cccumpo';
  delete props.children;
  delete props.className;
  return (
    <FormItem title={props.title} divider={props.divider ?? true} className={className} note={props.note} required={props.required}>
      <Flex basis='auto' grow={1} shrink={1}>
        <Slider {...props} />
        {[...children]}
      </Flex>
    </FormItem>
  );
}
