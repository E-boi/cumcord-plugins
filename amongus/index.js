import { React } from '@cumcord/modules/common';
import css from './style.css';
import Settings from './Settings';
const sussy = new Audio('https://cdn.discordapp.com/attachments/770304534203334678/892889666674634822/sussy.mp3');
sussy.loop = true;

let cssInject;

function updateVolume(volume, baka) {
	baka.volume = volume;
}

export default ({ persist }) => {
	return {
		onLoad() {
			cssInject = css();
			sussy.volume = persist.ghost.volume ?? 1;
			sussy.play();
		},
		onUnload: () => {
			cssInject?.();
			sussy.pause();
		},
		settings: React.createElement(Settings, { updateVolume, persist, sussy }),
	};
};
