import { webpack } from '@cumcord/modules';
import { after, before } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';
import { React } from '@cumcord/modules/common';
import { open } from './components';
import Modal from './components/Modal';
import css from './style.css';
import settings from './settings';

const Menu = webpack.findByProps('MenuGroup', 'MenuItem');
const MessageContext = webpack.find(m => m.default?.displayName === 'MessageContextMenu');
const ghregex = /^https?:\/\/(www.)?github.com\/[\w-]+\/[\w-]+\/?/;
const injections = [];
let cssInject;

const lazyPatchContextMenu = async (displayName, patch) => {
  const m = webpack.findByDisplayName(displayName, false);
  if (m) patch(m);
  else {
    const module = webpack.findByProps('openContextMenuLazy');
    injections.unshift(
      before('openContextMenuLazy', module, args => {
        const lazyRender = args[1];
        args[1] = async () => {
          const render = await lazyRender(args[0]);

          return config => {
            const menu = render(config);
            if (menu?.type?.displayName === displayName && patch) {
              injections[0]();
              patch(webpack.findByDisplayName(displayName, false));
              patch = false;
            }
            return menu;
          };
        };
        return args;
      })
    );
  }
};

export default ({ persist }) => {
  return {
    onLoad() {
      cssInject = css();
      lazyPatchContextMenu('MessageContextMenu', ContextMenu => {
        injections.push(
          after('default', ContextMenu, ([{ message, target }], res) => {
            if (!message.content.includes('https://github.com/') || !message.content.includes('https://github.com/')) return;
            const url = target.href?.match(ghregex)?.[0] || extractURL(message.content);
            if (url.split('/').length < 5) return res;
            if (!findInReactTree(res, c => c?.props?.id === 'githubModal')) {
              res.props.children.splice(
                4,
                0,
                React.createElement(
                  Menu.MenuGroup,
                  null,
                  React.createElement(Menu.MenuItem, {
                    action: () => open(React.createElement(Modal, { url: `${url.split('/')[3]}/${url.split('/')[4]}`, key: persist.ghost.apikey })),
                    id: 'githubModal',
                    label: 'Open',
                  })
                )
              );
            }
            return res;
          })
        );
      });
    },
    onUnload() {
      cssInject?.();
      injections.forEach(injection => injection?.());
    },
    settings: React.createElement(settings, { persist }),
  };
};

function extractURL(url) {
  const extracted = url
    .replace('tree', 'blob')
    .replace(/(?:\n|<|>|\*|_|`)/g, ' ')
    .split(' ')
    .filter(e => e.match(ghregex));

  return extracted[0];
}
