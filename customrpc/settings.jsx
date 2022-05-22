import { webpack } from '@cumcord/modules';
import { useNest } from '@cumcord/utils';
import { persist } from '@cumcord/pluginData';
import { showConfirmationModal } from '@cumcord/ui/modals';
import { Button, open, SwitchItem, Text } from './components';
import SelectInput from './components/SelectInput';
import RPCSettings from './components/RPCSettings';
import { useState } from 'react';
import { defaults, setRPC } from './utils';
import UserActivities from './components/UserActivities';

const { getCurrentUser } = webpack.findByProps('getCurrentUser');
const classes = {
  ...webpack.findByProps('h5'),
  ...webpack.findByProps('marginBottom20'),
};

export default () => {
  useNest(persist);
  const [selected, setSelected] = useState(persist.ghost.selected);

  return (
    <div>
      <SwitchItem
        value={persist.ghost.disabled}
        onChange={() => {
          persist.store.disabled = !persist.ghost.disabled;
          setRPC(persist.ghost.disabled ? null : persist.ghost.rpcs[selected]);
        }}
      >
        Disabled
      </SwitchItem>
      <SelectInput
        value={selected}
        onChange={val => setSelected(val.value)}
        options={persist.ghost.rpcs.map((r, idx) => ({ label: r.name, value: idx }))}
      >
        RPC'S
        {!isNaN(selected) && persist.ghost.selected !== selected && (
          <Button
            disabled={persist.ghost.selected === selected}
            onClick={() => {
              persist.store.selected = selected;
              if (!persist.ghost.disabled) setRPC(persist.ghost.rpcs[selected]);
            }}
          >
            Set as RPC
          </Button>
        )}
        {selected !== null && <Button onClick={() => open(<RPCSettings rpcName={selected} />)}>Edit RPC</Button>}
        <Button
          onClick={() => {
            persist.store.rpcs.push(defaults);
            setSelected(persist.ghost.rpcs.length - 1);
            open(<RPCSettings rpcName={persist.ghost.rpcs.length - 1} />);
          }}
        >
          Create new RPC
        </Button>
        <Button
          color={Button.Colors.RED}
          onClick={() =>
            showConfirmationModal({ confirmText: 'Delete', content: `Are you sure you want to delete that rpc?`, type: 'danger' }, t => {
              if (!t) return;
              persist.store.rpcs.splice(selected, 1);
              persist.store.selected = null;
              setSelected(null);
            })
          }
        >
          Delete RPC
        </Button>
      </SelectInput>

      <Text className={`${classes.h5} ${classes.marginBottom8}`}>Your RPC:</Text>
      <div className={classes.marginBottom20} style={{ backgroundColor: 'var(--background-floating)' }}>
        <UserActivities user={getCurrentUser()} />
      </div>
    </div>
  );
};
