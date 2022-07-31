import { findByProps } from '@cumcord/modules/webpack';
import { persist } from "@cumcord/pluginData";
import { Arrow, Clickable, ListSectionItem } from '.';
import { updateDmList } from '../utils';

const classes = { ...findByProps('privateChannelsHeaderContainer'), ...findByProps('containerDefault', 'name') };

export default ({ category }) => {
  const [collapsed, setCollapsed] = React.useState(category.collapsed);

  if (!category.dms.length) return null;
  return (
    <Clickable
      tabIndex={-1}
      className={[classes.clickable, 'cc-pd-header'].join(' ')}
      onClick={() => {
        category.collapsed = !collapsed;
        persist.store.categories[category.pos] = category;
        updateDmList();
        setCollapsed(!collapsed);
      }}
    >
      <ListSectionItem className={classes.privateChannelsHeaderContainer}>
        <span className={classes.headerText}>{category.name}</span>
        <Arrow className={'cc-pd-arrow'} direction={collapsed ? 'LEFT' : 'DOWN'} />
      </ListSectionItem>
    </Clickable>
  );
};
