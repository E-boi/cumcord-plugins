import { React } from '@cumcord/modules/common';
import Settings from './settings';
import css from './style.css';
import { persist } from '@cumcord/pluginData';
import { convertSettings, defaults, setRPC } from './utils';

let cssInject;
function setDefaults() {
  persist.store.rpcs = [];
  persist.store.rpcs.push(defaults);
  persist.store.selected = 0;
}

export default () => {
  if (persist.ghost['rpc1'] && !persist.ghost.rpcs) convertSettings();
  else if (!persist.ghost.rpcs) setDefaults();

  return {
    onLoad() {
      cssInject = css();
      setRPC(persist.ghost.rpcs[persist.ghost.selected]);
    },
    onUnload() {
      cssInject?.();
      setRPC(null);
    },
    settings: React.createElement(Settings),
  };
};
