import { React, FluxDispatcher } from '@cumcord/modules/common';
import { findByProps } from '@cumcord/modules/webpack';
import { open } from './components';
import ContextMenu from './components/ContextMenu';
import NewCatgoryModal from './components/NewCatgoryModal';
import { persist } from '@cumcord/pluginData';

const { scroller } = findByProps('privateChannelsHeaderContainer');

function updateDmList() {
  const el = document.getElementsByClassName(scroller)[0];
  if (!el) return;
  el.dispatchEvent(new Event('focusin'));

  setTimeout(() => {
    el.dispatchEvent(new Event('focusout'));
  }, 10);
}

function setupContextMenu(channel, rawItems) {
  let items = [];
  const category = getSetting('categories', []).find(category => category.dms.includes(channel.id));
  const isInGuildList = getSetting('guildlist', []).includes(channel.id);

  if (!category)
    items.push({
      type: 'item',
      id: 'catgory-submenu',
      label: 'Pin to Channel List',
      items() {
        const items1 = [
          {
            type: 'item',
            id: 'create-new-catgory',
            color: 'colorBrand',
            label: 'Add to new catgory',
            action() {
              open(React.createElement(NewCatgoryModal, { dmId: channel.id }));
            },
          },
          { type: 'separator' },
        ];

        getSetting('categories', []).forEach(category1 =>
          items1.push({
            type: 'item',
            id: `add-to-category-${category1.name}`,
            label: category1.name,
            action() {
              category1.dms.push(channel.id);
              setSetting(`categories[${category1.pos}]`, category1);
              updateDmList();
            },
          })
        );

        return [...items1];
      },
    });
  else
    items.push({
      type: 'item',
      id: 'remove-from-category',
      color: 'colorDanger',
      label: `Remove from ${category.name}`,
      action() {
        category.dms = category.dms.filter(id => id !== channel.id);
        setSetting(`categories[${category.pos}]`, category);
        updateDmList();
      },
    });

  if (!isInGuildList)
    items.push({
      type: 'item',
      id: 'add-to-list',
      label: 'Pin to Server List',
      action: () => {
        const updatedList = getSetting('guildlist', []);
        updatedList.push(channel.id);
        setSetting('guildlist', updatedList);
        FluxDispatcher.dirtyDispatch({ type: 'PDM_GUILDLIST_ADD' });
      },
    });
  else
    items.push({
      type: 'item',
      id: 'remove-from-list',
      label: 'Unpin from Server List',
      color: 'colorDanger',
      action: () => {
        const updatedList = getSetting('guildlist', []).filter(id => id !== channel.id);
        setSetting('guildlist', updatedList);
        FluxDispatcher.dirtyDispatch({ type: 'PDM_GUILDLIST_REMOVE' });
      },
    });

  if (rawItems) {
    const oldItems = items;
    items = [{ type: 'item', label: 'PinDMs', id: 'submenu', items: () => [...oldItems] }];
  }

  return ContextMenu({ items, rawItems });
}

function setSetting(setting, value) {
  // uhhhhh whatever it works
  const currentSetting = window._.get(persist.ghost, setting);

  if (!currentSetting) persist.store[setting] = value;
}

function getSetting(setting, defaultValue) {
  // makes it easy to get settings like "catgory[idx].dms"
  return window._.get(persist.ghost, setting) ?? defaultValue;
}

export { setupContextMenu, updateDmList, setSetting, getSetting };
