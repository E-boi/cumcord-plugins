import { log } from '@cumcord/utils/logger';
import modules from './modules';
import css from './style.css';

const DEFAULT_SETTINGS = [
	['favfriends', []],
	['notifsounds', {}],
	['infomodal', true],
	['displaystar', true],
	['statuspopup', true],
	['showtotal', true],
	['mutualguilds', true],
	['sortoptions', true],
];

export default class Plugin {
	constructor(persist) {
		this.settings = new Settings(persist);
		this.FRIEND_DATA = {
			statusStorage: {},
			lastMessageID: {},
		};
		this.FAVORITE_FRIENDS = this.settings.get('favfriends') || [];
		this.MODULES = modules;
		this.injections = {};
		this.css = null;
	}

	onLoad() {
		if (!this.settings.get('favfriends')) DEFAULT_SETTINGS.forEach(setting => this.settings.set(setting[0], setting[1]));
		// this.settings.set('favfriends', []);
		this.css = css();
		Object.keys(this.MODULES).forEach(module => {
			this.MODULES[module] = this.MODULES[module].bind(this);
			this.injections[module] = [];
		});
		log(this.injections);
		this.load();
	}

	onUnload() {
		this.unload();
		this.css?.();
		log('bye');
	}

	load(specific) {
		if (specific) this.MODULES[specific]();
		else
			Object.keys(this.MODULES).forEach(module => {
				this.MODULES[module]();
			});
	}

	unload(specific) {
		if (specific) this.injections[specific].forEach(e => e());
		else
			Object.keys(this.MODULES).forEach(module => {
				this.injections[module].forEach(e => e());
			});
	}

	reload(specific) {
		if (specific) {
			this.unload(specific);
			this.load(specific);
		} else {
			this.unload();
			this.load();
		}
	}
}

class Settings {
	constructor(persist) {
		this.persist = persist;
	}

	get(setting) {
		return this.persist.ghost[setting];
	}

	set(setting, value) {
		this.persist.store[setting] = value;
	}
}
