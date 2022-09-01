import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { React } from '@cumcord/modules/common';
import Connections from './Components/Connections';
import css from './style.css';
import loadIcons from './loadIcons';

const injection = [];
const Popout = webpack.findByDisplayName('UserPopoutBody', false);
const Skins = webpack.findByDisplayName('NoteSection', false);

export default () => {
  loadIcons();

  return {
    onLoad() {
      injection.push(css());
      injection.push(
        after('default', Popout, ([{ user }], res) => {
          if (!res) return res;
          console.log(res);
          res.props.children.splice(6, 0, React.createElement(Connections, { user: user.id }));
          return res;
        })
      );

      injection.push(
        after('default', Skins, ([{ user }], res) => {
          res?.props?.children?.unshift(React.createElement(Connections, { user: user.id, skin: true }));
          return res;
        })
      );
    },
    onUnload() {
      injection.forEach(i => i?.());
    },
  };
};
