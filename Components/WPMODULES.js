import { batchFind } from '@cumcord/modules/webpack';

export const [FormItem, FormText, FormDivider, Flex, DTextInput, Slider, SelectTempWrapper] = batchFind(e => {
  e.findByDisplayName('FormItem');
  e.findByDisplayName('FormText');
  e.findByDisplayName('FormDivider');
  e.findByDisplayName('Flex');
  e.findByDisplayName('TextInput');
  e.findByDisplayName('Slider');
  e.findByDisplayName('SelectTempWrapper');
});
