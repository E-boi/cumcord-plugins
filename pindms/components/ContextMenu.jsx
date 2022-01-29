import { findByProps } from '@cumcord/modules/webpack';

const { default: Menu, MenuSeparator, MenuItem, MenuCheckboxItem } = findByProps('MenuGroup');
const { closeContextMenu } = findByProps('openContextMenu');

function processItem(item) {
  item.id = `cc-pd-${item.id}`;
  switch (item.type) {
    case 'item':
      return <MenuItem {...item}>{item.items?.()?.map(processItem)}</MenuItem>;
    case 'separator':
      return <MenuSeparator />;
    case 'checkbox':
      return <MenuCheckboxItem {...item} />;
    default:
      return null;
  }
}

export default props => {
  props.items = props.items.map(processItem);
  return props.rawItems ? [...props.items] : <Menu onClose={() => closeContextMenu()}>{props.items}</Menu>;
};
