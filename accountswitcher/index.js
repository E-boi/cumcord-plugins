import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import { open, Tooltip } from './components';
import Modal from './components/Modal';
import SwitchIcon from './components/svg';
import css from './style.css';

const classes = {
  ...webpack.findByProps('iconWrapper', 'clickable'),
};
let injection;
let cssInject;
const HeaderBarContainer = webpack.findByDisplayName('HeaderBarContainer');

export default ({ persist }) => {
  if (!persist.ghost.accounts) persist.store.accounts = [];
  return {
    onLoad() {
      cssInject = css();
      injection = after('renderLoggedIn', HeaderBarContainer.prototype, (_, res) => {
        const SwitchButton = React.createElement(
          Tooltip,
          { text: 'Switch Accounts', position: 'bottom' },
          React.createElement(
            'div',
            { className: ['switch-acc-button', classes.iconWrapper, classes.clickable].join(' ') },
            React.createElement(SwitchIcon, { onClick: () => open(React.createElement(Modal)) })
          )
        );

        if (!res.props.toolbar) {
          res.props.toolbar = SwitchButton;
        } else {
          res.props.toolbar.props.children.push(SwitchButton);
        }
        return res;
      });
    },
    onUnload() {
      injection?.();
      cssInject?.();
    },
  };
};
