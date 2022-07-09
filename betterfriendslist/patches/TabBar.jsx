import { batchFind } from '@cumcord/modules/webpack';
import { after } from '@cumcord/patcher';
import { i18n, constants } from '@cumcord/modules/common';
import NumberBadge from '../components/NumberBadge';
import { persist } from '@cumcord/pluginData';

const { Messages } = i18n;
const { RelationshipTypes } = constants;
const [TabBar, { getRelationships }, { getStatus }] = batchFind(({ findByDisplayName, findByProps }) => {
  findByDisplayName('TabBar');
  findByProps('getRelationships');
  findByProps('getStatus', 'isMobileOnline');
});

export default () => {
  const tabbar = after('render', TabBar.prototype, (args, res) => {
    if (res.props['aria-label'] !== Messages.FRIENDS || persist.ghost.all) return res;
    const relationships = Object.entries(getRelationships());
    const onlineCount = relationships.map(r => r[1] === RelationshipTypes.FRIEND && getStatus(r[0]) !== 'offline' && r).filter(r => r).length;
    const allCount = relationships.map(r => r[1] === RelationshipTypes.FRIEND && r).filter(r => r).length;
    const pendingCount = [
      relationships.map(r => r[1] === RelationshipTypes.PENDING_INCOMING).filter(r => r).length,
      relationships.map(r => r[1] === RelationshipTypes.PENDING_OUTGOING).filter(r => r).length,
    ];
    const blockedCount = relationships.map(r => r[1] === RelationshipTypes.BLOCKED).filter(r => r).length;

    res.props.children.forEach(c => {
      const title = Array.isArray(c.props.children) ? c.props.children[0] : c.props.children;
      switch (c.props.id) {
        case 'ONLINE':
          c.props.children = [title, <NumberBadge count={onlineCount} />];
          break;

        case 'ALL':
          c.props.children = [title, <NumberBadge count={allCount} />];
          break;

        case 'PENDING':
          c.props.children = [
            title,
            <NumberBadge count={pendingCount[0]} tooltip='Incoming' />,
            <NumberBadge count={pendingCount[1]} tooltip='Outgoing' />,
          ];
          break;

        case 'BLOCKED':
          c.props.children = [title, <NumberBadge count={blockedCount} />];
          break;
      }
    });
    return res;
  });

  return () => {
    tabbar();
  };
};
