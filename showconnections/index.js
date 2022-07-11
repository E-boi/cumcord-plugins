import { webpack } from '@cumcord/modules';
import { after, before, instead } from '@cumcord/patcher';
import { React } from '@cumcord/modules/common';
import Connections from './Components/Connections';
import css from './style.css';
import loadIcons from './loadIcons';

let injection;
let cssInject;
const Popout = webpack.findByDisplayNameAll('UserPopoutBody', false)[1];

export default () => {
  loadIcons();

  return {
    onLoad() {
      cssInject = css();
      injection = after('default', Popout, ([{ user }], res) => {
        if (!res) return res;
        res.props.children.splice(2, 0, React.createElement(Connections, { user: user.id }));
        return res;
      });
    },
    onUnload() {
      injection?.();
      cssInject?.();
    },
  };
};
