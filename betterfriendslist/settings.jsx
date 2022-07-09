import { findByDisplayName } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';
import { useNest } from '@cumcord/utils';

const SwitchItem = findByDisplayName('SwitchItem');

export default () => {
  useNest(persist);
  return (
    <div>
      <SwitchItem value={!persist.ghost.all} onChange={() => (persist.store.all = !persist.ghost.all)}>
        Adds total Amount for All/Requested/Blocked
      </SwitchItem>
      <SwitchItem value={!persist.ghost.sort} onChange={() => (persist.store.sort = !persist.ghost.sort)}>
        Adds Sort Options
      </SwitchItem>
      <SwitchItem value={!persist.ghost.mutual} onChange={() => (persist.store.mutual = !persist.ghost.mutual)}>
        Adds mutual Servers in Friend List
      </SwitchItem>
    </div>
  );
};
