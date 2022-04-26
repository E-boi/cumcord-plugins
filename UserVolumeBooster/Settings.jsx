import { persist } from '@cumcord/pluginData';
import { useNest } from '@cumcord/utils';
import TextInput from './Components/TextInput';

export default () => {
  useNest(persist);
  return (
    <TextInput
      note='Maximum adjustable volume on the volume slider'
      defaultValue={persist.ghost.max ?? 400}
      onChange={val => !isNaN(val) && (persist.store.max = Number(val))}
    >
      Max Volume
    </TextInput>
  );
};
