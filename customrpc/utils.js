import { FluxDispatcher } from '@cumcord/modules/common';
import { findByProps } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';

const { getAssetIds, getAssets: getAssetss } = findByProps('getAssetIds');

export function convertSettings() {
  if (persist.ghost.converte) return;
  const settings = persist.ghost.rpc1 ? Object.entries(persist.ghost) : Object.entries(persist.ghost.rpcs);
  const rpcs = settings
    .map(r => {
      if (typeof r[1] !== 'object') return;
      const rpc = r[1];

      rpc.buttons = [];
      rpc.buttons.push(rpc.button1 || defaults.buttons[0]);
      rpc.buttons.push(rpc.button2 || defaults.buttons[1]);
      return rpc;
    })
    .filter(e => e);
  const selected = typeof persist.ghost.selected !== 'number' ? settings.findIndex(r => r[0] === persist.ghost.selected) : persist.ghost.selected;
  persist.store.rpc1 = null;
  persist.store.rpc2 = null;
  persist.store.rpc3 = null;
  persist.store.rpcs = rpcs;
  persist.store.selected = selected;
  persist.store.disabled = persist.ghost.disable;
  persist.store.converte = true;
}

export async function setRPC(activity) {
  const rpc = activity && (await formatRPC(activity));
  FluxDispatcher.dispatch({
    type: 'LOCAL_ACTIVITY_UPDATE',
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
    state: activity.type !== 1 ? activity.state : null,
    assets: {
      large_image: activity.type !== 1 ? assets[0] : null,
      small_image: activity.type !== 1 ? assets[1] : null,
      large_text: activity.type !== 1 ? activity.large_text : null,
      small_text: activity.type !== 1 ? activity.small_text : null,
    },
    timestamps: activity.show_time && {
      start: Date.now(),
    },
    party: activity.party &&
      activity.party_size && {
        size: [activity.party, activity.party_size],
        id: 'cum',
      },
    type: activity.type,
    url: activity.url,
  };

  activity.buttons?.forEach(button => {
    if (button?.url && button?.label) {
      if (!rpc.buttons) rpc.buttons = [];
      if (!rpc.metadata) rpc.metadata = { button_urls: [] };
      rpc.buttons.push(button.label);
      rpc.metadata.button_urls.push(button.url);
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
