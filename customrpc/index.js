import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import Settings from './settings';
import css from './style.css';
import { persist } from '@cumcord/pluginData';
import { defaults, setRPC } from './utils';

const {
  SET_ACTIVITY: { handler: SET_RPC },
} = webpack.findByProps('SET_ACTIVITY');

let cssInject;

function setDefaults() {
  persist.store.rpcs = [];
  persist.store.rpcs.push(defaults);
  persist.store.selected = 0;
}

// function rpc(store, disable = false) {
//   const selected = store.selected;
//   const rpc = {
//     isSocketConnected: () => true,
//     socket: {
//       id: 420,
//       application: {
//         id: store[selected].client_id,
//         name: store[selected].name,
//       },
//       transport: 'ipc',
//     },
//     args: {
//       pid: 69,
//       activity:
//         disable || store.disable
//           ? null
//           : {
//               details: store[selected].details,
//               state: store[selected].state,
//               assets: {
//                 large_image: store[selected].large_image,
//                 small_image: store[selected].small_image,
//                 large_text: store[selected].large_text,
//                 small_text: store[selected].small_text,
//               },
//               timestamps: store[selected].show_time && {
//                 start: Date.now(),
//               },
//             },
//     },
//   };

//   if (store[selected].button1?.url && store[selected].button1?.label && rpc.args.activity)
//     rpc.args.activity.buttons?.push(store[selected].button1) || (rpc.args.activity.buttons = [store[selected].button1]);

//   if (store[selected].button2?.url && store[selected].button2?.label && rpc.args.activity)
//     rpc.args.activity.buttons?.push(store[selected].button2) || (rpc.args.activity.buttons = [store[selected].button2]);

//   return rpc;
// }

export default () => {
  if (!persist.ghost['rpc1']) setDefaults();
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
