import { findByDisplayName } from '@cumcord/modules/webpack';
import { useNest } from '@cumcord/utils';
import { persist } from '@cumcord/pluginData';
import TextInput from './components/TextInput';

const SwitchItem = findByDisplayName('SwitchItem');

export default () => {
  useNest(persist);

  return (
    <div>
      <SwitchItem value={persist.ghost.hour12} onChange={() => (persist.store.hour12 = !persist.ghost.hour12)}>
        12-hour time format
      </SwitchItem>
      <SwitchItem value={persist.ghost.custom} onChange={() => (persist.store.custom = !persist.ghost.custom)}>
        Custom time format
      </SwitchItem>
      <TextInput
        value={persist.ghost.format || '%d.%m.%y, %H:%M:%S %ampm'}
        onChange={val => (persist.store.format = val)}
        disabled={!persist.ghost.custom}
      >
        Format
      </TextInput>
    </div>
  );
};
