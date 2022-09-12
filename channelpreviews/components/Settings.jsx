import { batchFind } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';
import { useNest } from '@cumcord/utils';
import { SliderInput } from '../../Components';
import Category from '../../Components/Category';
import RadioGroup from '../../Components/RadioGroup';
import SwitchItem from '../../Components/SwitchItem';
import plugin from '../index';

const [{ MESSAGE_GROUP_SPACING, DEFAULT_COMPACT_SPACING, DEFAULT_COZY_SPACING }, { MessageDisplayCompact }] = batchFind(f => {
  f.findByProps('MESSAGE_GROUP_SPACING');
  f.findByProps('MessageDisplayCompact');
});

export default () => {
  const [cats, setCats] = React.useState({ 0: false, 1: false });
  useNest(persist);

  const compact = MessageDisplayCompact.getSetting();

  const catsSet = (cats, key) =>
    Object.fromEntries(
      Object.entries(cats).map(cat => {
        if (cat[0] === key && !cat[1]) cat[1] = true;
        else cat[1] = false;
        return cat;
      })
    );

  return (
    <div>
      <Category opened={cats['0']} title='Trigger' onClick={() => setCats(c => catsSet(c, '0'))}>
        <RadioGroup
          value={persist.ghost.displayOn || 'hover'}
          options={[
            { name: 'Hover', value: 'hover' },
            { name: 'Mouse Wheel Click', value: 'mwheel' },
          ]}
          onChange={e => (persist.store.displayOn = e.value)}
        >
          Display Preview On
        </RadioGroup>

        <SliderInput
          stickToMarkers
          disabled={(persist.ghost.displayOn || 'hover') !== 'hover'}
          initialValue={persist.ghost.delay || 0.3}
          defaultValue={0.3}
          markers={[0.2, 0.3, 0.4, 0.5, 0.7, 1, 1.5, 2, 2.5, 3, 3.5, 4]}
          onMarkerRender={m => m + 's'}
          onValueChange={val => (persist.store.delay = val)}
        >
          Hover Delay
        </SliderInput>
      </Category>

      <Category opened={cats['1']} title='Appearance' onClick={() => setCats(c => catsSet(c, '1'))}>
        <RadioGroup
          value={persist.ghost.displayMode || 'sync'}
          options={[
            { name: 'Cozy', value: 'cozy' },
            { name: 'Compact', value: 'compact' },
            { name: 'Sync with Client', value: 'sync' },
          ]}
          onChange={e => (persist.store.displayMode = e.value)}
        >
          Display Message
        </RadioGroup>

        <RadioGroup
          value={persist.ghost.groupSpacing ?? 'sync'}
          options={[
            { name: 'Custom', value: 'custom' },
            { name: 'Sync with Client', value: 'sync' },
          ]}
          onChange={e => (persist.store.groupSpacing = e.value)}
        >
          Space Between Messages
        </RadioGroup>
        <SliderInput
          disabled={(persist.ghost.groupSpacing || 'sync') !== 'custom'}
          markers={MESSAGE_GROUP_SPACING}
          stickToMarkers
          onMarkerRender={m => m + 'px'}
          defaultValue={compact ? DEFAULT_COMPACT_SPACING : DEFAULT_COZY_SPACING}
          initialValue={persist.ghost.groupSpacingNum ?? compact ? DEFAULT_COMPACT_SPACING : DEFAULT_COZY_SPACING}
          onValueChange={val => (persist.store.groupSpacingNum = val)}
        >
          Space Between Message Groups
        </SliderInput>

        <SliderInput
          note='Sets the opacity level of darkening layer.'
          defaultValue={0.3}
          initialValue={persist.ghost.opacity ?? 0.3}
          onValueChange={val => (persist.store.opacity = val)}
          markers={[0.1, 0.2, 0.3, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
          stickToMarkers
        >
          Darken Level
        </SliderInput>

        <SliderInput
          note="Sets popouts's window height in percentages relative to Discord's window height."
          defaultValue={30}
          initialValue={persist.ghost.hpopout || 30}
          onValueChange={val => {
            persist.store.hpopout = val;
            plugin.setVars();
          }}
          markers={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          stickToMarkers
        >
          Popout Height
        </SliderInput>

        <SliderInput
          note="Sets popouts's window width in percentages relative to Discord's window width."
          defaultValue={40}
          initialValue={persist.ghost.wpopout || 40}
          onValueChange={val => {
            persist.store.wpopout = val;
            plugin.setVars();
          }}
          markers={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          stickToMarkers
        >
          Popout Width
        </SliderInput>

        <SwitchItem
          note="Shows who's typing in previewed channel."
          value={persist.ghost.typingUsers ?? true}
          onChange={() => (persist.store.typingUsers = !persist.ghost.typingUsers)}
        >
          Show Typing Users
        </SwitchItem>

        <SwitchItem
          note='Shows tabs for the Channel Preview popout and Threads popout'
          value={persist.ghost.tabs ?? true}
          onChange={() => (persist.store.tabs = !persist.ghost.tabs)}
        >
          Show Tabs
        </SwitchItem>
      </Category>
    </div>
  );
};
