import { batchFind } from '@cumcord/modules/webpack';

export const [
  FormItem,
  FormText,
  FormDivider,
  Flex,
  DTextInput,
  Slider,
  SelectTempWrapper,
  { default: DColorPicker, DefaultColorButton, CustomColorButton, CustomColorPicker },
  Tooltip,
  Popout,
] = batchFind(e => {
  e.findByDisplayName('FormItem');
  e.findByDisplayName('FormText');
  e.findByDisplayName('FormDivider');
  e.findByDisplayName('Flex');
  e.findByDisplayName('TextInput');
  e.findByDisplayName('Slider');
  e.findByDisplayName('SelectTempWrapper');
  e.find(m => m.default?.displayName === 'ColorPicker' && !m.default.defaultProps);
  e.findByDisplayName('Tooltip');
  e.findByDisplayName('Popout');
});
