import { constants, i18n } from '@cumcord/modules/common';
import { findByProps } from '@cumcord/modules/webpack';
import FormItem from './FormItem';
import { CustomColorButton, CustomColorPicker, DColorPicker, DefaultColorButton, Popout, Tooltip } from './WPMODULES';

export default function ColorPicker(props) {
  if (!props.colors) props.colors = constants.ROLE_COLORS;
  if (typeof props.children !== 'string') throw new Error('Children has to be a string');

  props.customColor = props.customColor || props.value === props.defaultColor || props.colors.some(e => e === props.value) ? null : props.value;
  return (
    <FormItem title={props.children} note={props.note} required={props.required}>
      <DColorPicker {...props} renderDefaultButton={DefaultButton} renderCustomButton={e => <ColorButton {...e} onChange={props.onChange} />} />
    </FormItem>
  );
}

ColorPicker.utils = findByProps('hex2int');

function ColorButton(props) {
  return (
    <Popout
      renderPopout={() => !props.disabled && <CustomColorPicker value={props.customColor} onChange={props.onChange} />}
      position={props.pickerPosition || 'right'}
    >
      {e => (
        <Tooltip text={i18n.Messages.CUSTOM_COLOR} position='bottom'>
          {t => (
            <div {...t} {...e}>
              <CustomColorButton {...props} aria-label={i18n.Messages.CUSTOM_COLOR} />
            </div>
          )}
        </Tooltip>
      )}
    </Popout>
  );
}

function DefaultButton(props) {
  return (
    <Tooltip text={i18n.Messages.DEFAULT} position='bottom'>
      {e => (
        <div {...e}>
          <DefaultColorButton {...props} />
        </div>
      )}
    </Tooltip>
  );
}
