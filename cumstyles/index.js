import { loadThemes, unloadThemes } from './utils';
import { React } from '@cumcord/modules/common';
import Settings from './Settings';
import css from './style.css';

let cssInject;

export default ({ persist }) => {
	return {
		onLoad() {
			cssInject = css();
			persist.ghost.themes && loadThemes(persist.ghost.themes);
		},
		onUnload() {
			cssInject?.();
			unloadThemes();
		},
		settings: React.createElement(Settings, { persist }),
	};
};
