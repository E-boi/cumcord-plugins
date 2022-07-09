import { batchFind } from '@cumcord/modules/webpack';
import { after } from '@cumcord/patcher';
import { persist } from '@cumcord/pluginData';
import { findInReactTree } from '@cumcord/utils';
import GuildIcons from '../components/GuildIcons';

const injections = [];

const [PeopleListItem, FriendRow, PendingRow, BlockedRow] = batchFind(({ findByDisplayName }) => {
  findByDisplayName('PeopleListItem');
  findByDisplayName('FriendRow');
  findByDisplayName('PendingRow', false);
  findByDisplayName('BlockedRow', false);
});

function PeopleRow(_, res) {
  if (persist.ghost.mutual) return res;
  if (!this.props.mutualGuilds?.length) return res;
  const guilds = this.props.mutualGuilds;
  const og = res.props.children;
  res.props.children = (...args) => {
    const children = og(...args);
    const p = findInReactTree(children, r => Array.isArray(r.children))?.children;
    if (!p) return children;
    p.splice(1, 0, <GuildIcons guilds={guilds} />);
    p[2].props.className += ' ccbfl-margin';
    return children;
  };
  return res;
}

function OtherRow(args, res) {
  res.props.mutualGuilds = this?.props?.mutualGuilds || args[0].mutualGuilds;
  return res;
}

export default () => {
  injections.push(
    after('render', PeopleListItem.prototype, PeopleRow),
    after('render', FriendRow.prototype, OtherRow),
    after('default', PendingRow, OtherRow),
    after('default', BlockedRow, OtherRow)
  );

  return () => {
    injections.forEach(i => i?.());
  };
};
