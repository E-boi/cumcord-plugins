import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import Settings from './settings';
import css from './style.css';
const {
	SET_ACTIVITY: { handler: SET_RPC },
} = webpack.findByProps('SET_ACTIVITY');

let cssInject;
const defaults = {
	rpc1: {
		show_time: true,
		client_id: '892203377503658064',
		name: 'cum',
		state: 'eating cum',
		details: 'Browsing cum',
		large_image: 'cumcord',
		small_image: 'cumcord',
		large_text: 'cuming',
		small_text: 'made with cum',
	},
	rpc2: {
		show_time: true,
		client_id: '892203377503658064',
		name: 'cum',
		state: 'eating cum',
		details: 'Browsing cum',
		large_image: 'cumcord',
		small_image: 'cumcord',
		large_text: 'cuming',
		small_text: 'made with cum',
	},
	rpc3: {
		show_time: true,
		client_id: '892203377503658064',
		name: 'cum',
		state: 'eating cum',
		details: 'Browsing cum',
		large_image: 'cumcord',
		small_image: 'cumcord',
		large_text: 'cuming',
		small_text: 'made with cum',
	},

	selected: 'rpc1',
};

function setDefault(store) {
	Object.entries(defaults).forEach(rpc => (store[rpc[0]] = rpc[1]));
}

function rpc(store, disable = false) {
	const selected = store.selected;
	const rpc = {
		isSocketConnected: () => true,
		socket: {
			id: 420,
			application: {
				id: store[selected].client_id,
				name: store[selected].name,
			},
			transport: 'ipc',
		},
		args: {
			pid: 69,
			activity:
				disable || store.disable
					? null
					: {
							details: store[selected].details,
							state: store[selected].state,
							assets: {
								large_image: store[selected].large_image,
								small_image: store[selected].small_image,
								large_text: store[selected].large_text,
								small_text: store[selected].small_text,
							},
							timestamps: store[selected].show_time && {
								start: Date.now(),
							},
					  },
		},
	};

	if (store[selected].button1?.url && store[selected].button1?.label && rpc.args.activity)
		rpc.args.activity.buttons?.push(store[selected].button1) || (rpc.args.activity.buttons = [store[selected].button1]);

	if (store[selected].button2?.url && store[selected].button2?.label && rpc.args.activity)
		rpc.args.activity.buttons?.push(store[selected].button2) || (rpc.args.activity.buttons = [store[selected].button2]);

	return rpc;
}

export default ({ persist }) => {
	if (!persist.ghost['rpc1']) setDefault(persist.store);
	return {
		onLoad() {
			cssInject = css();
			SET_RPC(rpc(persist.ghost));
		},
		onUnload() {
			cssInject?.();
			SET_RPC(rpc(persist.ghost, true));
		},
		settings: React.createElement(Settings, { persist, reloadRPC: store => SET_RPC(rpc(store)) }),
	};
};
