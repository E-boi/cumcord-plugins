const createId = () => Math.random().toString(16).substring(2);

export async function loadTheme(url, themeId) {
	const theme = await fetch(url);
	if (!theme.ok) return;
	const clone = theme.clone();
	const { type } = await theme.blob();
	if (type !== 'text/plain') return;
	const id = themeId || createId();
	const style = document.createElement('style');
	style.className = `CUMCORD_INJECTED_THEME theme-${id}`;
	style.appendChild(document.createTextNode(await clone.text()));
	document.head.appendChild(style);
	return { [id]: url };
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
	const themes = document.querySelectorAll('.CUMCORD_INJECTED_THEME');
	themes.forEach(elm => elm.remove());
}

export function unloadTheme(id) {
	document.querySelector(`.theme-${id}`)?.remove();
}
