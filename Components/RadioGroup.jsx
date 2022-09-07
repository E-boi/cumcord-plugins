import { findByDisplayName } from '@cumcord/modules/webpack';
import FormItem from './FormItem';

const RadioGroup = findByDisplayName('RadioGroup');

export default props => {
  const title = props.children;
  delete props.children;
  return (
    <FormItem title={title} note={props.note} required={props.required}>
      <RadioGroup {...{ ...props }} />
    </FormItem>
  );
};
