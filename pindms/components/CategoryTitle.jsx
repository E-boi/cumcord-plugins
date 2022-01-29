import { findByProps } from '@cumcord/modules/webpack';
import { Arrow, Clickable, ListSectionItem } from '.';
import { updateDmList } from '../utils';

const classes = { ...findByProps('privateChannelsHeaderContainer'), ...findByProps('containerDefault', 'name') };

export default ({ category, settings }) => {
  const [collapsed, setCollapsed] = React.useState(category.collapsed);

  if (!category.dms.length) return null;
  return (
    <Clickable
      tabIndex={-1}
      className={[classes.clickable, 'cc-pd-header'].join(' ')}
      onClick={() => {
        category.collapsed = !collapsed;
        settings.set(`categories[${category.pos}]`, category);
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
