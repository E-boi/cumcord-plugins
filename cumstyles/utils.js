import { injectCSS } from '@cumcord/patcher';

const createId = () => Math.random().toString(16).substring(2);
const Themes = new Map();

export async function loadTheme(url, themeId) {
	const theme = await fetch(url);
	if (!theme.ok) return;
	Themes.set(themeId, injectCSS(await theme.text()));
}

export function loadThemes(themes) {
	Object.entries(themes)
		.filter(d => d)
		.forEach(theme => theme[1].applied && loadTheme(theme[1].url, theme[0]));
}

export function saveTheme(store, url) {
	const id = createId();
	store.themes[id] = {
		url,
		applied: false,
	};
	return { [id]: url };
}

export function unloadThemes() {
	Themes.forEach(t => t());
	Themes.clear();
}

export function unloadTheme(id) {
	Themes.get(id)?.();
	Themes.delete(id);
}
