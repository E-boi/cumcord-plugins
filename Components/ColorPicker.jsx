import { constants, i18n } from '@cumcord/modules/common';
import FormItem from './FormItem';
import { CustomColorButton, CustomColorPicker, DColorPicker, DefaultColorButton, Popout, Tooltip } from './WPMODULES';

export default function ColorPicker(props) {
  console.log(props);
  if (!props.colors) props.colors = constants.ROLE_COLORS;
  if (typeof props.children !== 'string') throw new Error('Children has to be a string');
  // const children = Array.isArray(props.children) && typeof props.children === 'object' ? props.children : [props.children];
  // const title = typeof children === 'string' && children;
  const className = props.className ? `${props.className} cccumpo` : 'cccumpo';
  delete props.className;

  return (
    <FormItem title={props.children} divider={props.divider ?? true} className={className} note={props.note} required={props.required}>
      <DColorPicker {...props} renderDefaultButton={DefaultButton} renderCustomButton={e => <ColorButton {...e} onChange={props.onChange} />} />
      {/* {!title && [...children]} */}
    </FormItem>
  );
}

function ColorButton(props) {
  console.log(props);
  return (
    <Popout renderPopout={() => <CustomColorPicker value={props.value} onChange={props.onChange} />} position={props.pickerPosition || 'right'}>
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
