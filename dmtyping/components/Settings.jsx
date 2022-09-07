import { i18n } from '@cumcord/modules/common';
import { findByDisplayName } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';
import { useNest } from '@cumcord/utils';
import { SliderInput } from '../../Components';
import ColorPicker from '../../Components/ColorPicker';
import RadioGroup from '../../Components/RadioGroup';
import SwitchItem from '../../Components/SwitchItem';
import Preview from './Preview';

const FormTitle = findByDisplayName('FormTitle');

export default () => {
  useNest(persist);
  return (
    <div>
      {/* for some reason the props dont get passed when the injection runs */}
      {/* <div className='dmti-preview-container'>
        <FormTitle>{i18n.Messages.FORM_LABEL_VIDEO_PREVIEW}</FormTitle>
        <Preview />
      </div> */}

      <RadioGroup
        options={[
          { name: 'Badge: Show a badge on the home icon.', value: 'badge' },
          { name: 'Icon: Show just an icon below the home icon.', value: 'icon' },
          { name: 'Text: Show just text.', value: 'text' },
          { name: 'Both: Show both an icon and text.', value: 'both' },
        ]}
        value={persist.ghost.indicatorStyle || 'icon'}
        onChange={e => (persist.store.indicatorStyle = e.value)}
      >
        Indicator Style
      </RadioGroup>

      {persist.ghost.indicatorStyle === 'badge' && (
        <ColorPicker
          note='The background color of the badge indicator.'
          defaultColor={ColorPicker.utils.hex2int('#43b581')}
          value={ColorPicker.utils.hex2int(persist.ghost.indicatorBgColor || '#43b581')}
          onChange={val => (persist.store.indicatorBgColor = ColorPicker.utils.int2hex(val))}
        >
          Badge Background Color
        </ColorPicker>
      )}

      {(persist.ghost.indicatorStyle === 'text' || persist.ghost.indicatorStyle === 'both') && (
        <SliderInput
          className='dmti-settings-slider'
          note='The maximum amount of users to display on the tooltip.'
          stickToMarkers
          initialValue={persist.ghost.maxTypingUsers || 3}
          defaultValue={persist.ghost.maxTypingUsers || 3}
          markers={[3, 4, 5, 6, 7, 8]}
          onMarkerRender={m => (m === 3 ? i18n.Messages.DEFAULT : i18n.Messages.NUM_USERS.format({ num: m }))}
          onValueChange={val => (persist.store.maxTypingUsers = val)}
        >
          Tooltip Max Users
        </SliderInput>
      )}

      <SwitchItem
        note='Prevents the indicator from showing if the current channel with typing users is open.'
        value={persist.ghost.hideWhenViewed ?? true}
        onChange={() => (persist.store.hideWhenViewed = !persist.store.hideWhenViewed)}
      >
        Hide Indicator
      </SwitchItem>

      <SwitchItem
        note="Don't show indicator for users who are blocked."
        value={persist.ghost.ignoreBlocked ?? true}
        onChange={() => (persist.store.ignoreBlocked = !persist.store.ignoreBlocked)}
      >
        Ignore Blocked Users
      </SwitchItem>

      <SwitchItem
        note="Don't show indicator for users who you are not friends with."
        value={persist.ghost.ignoreNonFriend ?? true}
        onChange={() => (persist.store.ignoreNonFriend = !persist.store.ignoreNonFriend)}
      >
        Ignore Non-Friend Users
      </SwitchItem>

      <SwitchItem
        note='Animate the indicator.'
        value={persist.ghost.animateIndicator ?? true}
        onChange={() => (persist.store.animateIndicator = !persist.store.animateIndicator)}
      >
        Animate Indicator
      </SwitchItem>
    </div>
  );
};
