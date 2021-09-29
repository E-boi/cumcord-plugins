// import { webpack } from '@cumcord/modules';
import { React } from '@cumcord/modules/common';
import Settings from './Settings';
const sussy = new Audio('https://raw.githubusercontent.com/E-boi/among-us/main/sussy.mp3');
sussy.loop = true;

function updateVolume(volume, baka) {
	baka.volume = volume;
}

export default ({ persist }) => {
	return {
		onLoad() {
			sussy.volume = persist.ghost.volume ?? 1;
			sussy.play();
		},
		onUnload: () => sussy.pause(),
		settings: React.createElement(Settings, { updateVolume, persist, sussy }),
	};
};
