import { FluxDispatcher, constants } from '@cumcord/modules/common';
import { findByProps } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';

const { ActionTypes } = constants;
const { getAssetIds, getAssets: getAssetss } = findByProps('getAssetIds');

export function convertSettings() {
  if (persist.ghost.converted) return;
  const settings = Object.entries(persist.ghost);
  const rpcs = settings
    .map(r => {
      if (r[0] === 'selected' || r[0] === 'disable') return;
      const rpc = r[1];

      rpc.buttons = [];
      if (rpc.button1) rpc.buttons.push(rpc.button1);
      if (rpc.button2) rpc.buttons.push(rpc.button2);
      return rpc;
    })
    .filter(e => e);
  const selected = settings.findIndex(r => r[0] === settings[3][1]);
  persist.store.rpc1 = null;
  persist.store.rpc2 = null;
  persist.store.rpc3 = null;
  persist.store.rpcs = rpcs;
  persist.store.selected = selected;
  persist.store.disabled = persist.ghost.disable;
  persist.store.converted = true;
}

export async function setRPC(activity) {
  const rpc = activity && (await formatRPC(activity));
  FluxDispatcher.dispatch({
    type: ActionTypes.LOCAL_ACTIVITY_UPDATE,
    socketId: 'cumcord-epic-sex',
    pid: 69,
    activity: rpc,
  });
}

async function formatRPC(activity) {
  const assets = await getAssetIds(activity.client_id, [activity.large_image, activity.small_image]);

  const rpc = {
    application_id: activity.client_id,
    name: activity.name,
    details: activity.details,
    state: activity.state,
    assets: {
      large_image: assets[0],
      small_image: assets[1],
      large_text: activity.large_text,
      small_text: activity.small_text,
    },
    timestamps: activity.show_time && {
      start: Date.now(),
    },
    buttons: [],
    metadata: {
      button_uris: [],
    },
    type: activity.type,
    url: activity.url,
  };

  activity.buttons?.forEach(button => {
    if (button?.url && button?.label) {
      rpc.buttons.push(button.label);
      rpc.metadata.button_uris.push(button.url);
    }
  });

  return rpc;
}

export async function getAssets(id) {
  const assets = await getAssetss(id);
  const images = Object.values(assets).filter(a => a.type === 1);
  images.unshift({ name: '', type: 1 });
  return images.filter(asset => asset.type === 1).map(asset => ({ label: asset.name, value: asset.name }));
}

// sh
export const defaults = {
  show_time: true,
  client_id: '892203377503658064',
  name: 'cum',
  state: 'eating cum',
  details: 'Browsing cum',
  large_image: 'cumcord',
  small_image: 'cumcord',
  large_text: 'cuming',
  small_text: 'made with cum',
  buttons: [
    { label: '', url: '' },
    { label: '', url: '' },
  ],
  type: 0,
};
