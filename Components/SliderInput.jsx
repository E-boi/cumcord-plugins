import FormItem from './FormItem';
import { Slider } from './WPMODULES';

export default function SliderInput(props) {
  const title = props.children;
  delete props.children;
  return (
    <FormItem title={title} note={props.note} required={props.required}>
      <Slider {...props} />
    </FormItem>
  );
}
