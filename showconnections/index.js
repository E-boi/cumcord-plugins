import { webpack } from '@cumcord/modules';
import { after } from '@cumcord/patcher';
import { React } from '@cumcord/modules/common';
import Connections from './Components/Connections';
import css from './style.css';

let injection;
let cssInject;
const Popout = webpack.find(m => m.default?.displayName === 'UserPopoutBody');

export default () => {
	// e
	window.webpackChunkdiscord_app.push([
		[Math.random().toString(36)],
		{},
		e => {
			e(868950);
		},
	]);
	
	return {
		onLoad() {
			cssInject = css();
			injection = after('default', Popout, ([{ user }], res) => {
				if (!res) return res;
				res.props.children.splice(2, 0, React.createElement(Connections, { user: user.id }));
				return res;
			});

			Popout.default.displayName = 'UserPopoutBody';
		},
		onUnload() {
			injection?.();
			cssInject?.();
		},
	};
};
