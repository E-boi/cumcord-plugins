import { useNest } from '@cumcord/utils';
import { webpack } from '@cumcord/modules';
import TextInput from './components/TextInput';
import { loadTheme, saveTheme, unloadTheme } from './utils';

const Button = webpack.find(m => m.DropdownSizes);

export default ({ persist }) => {
	useNest(persist);
	return (
		<div>
			{Object.entries(persist.ghost.themes || {})
				.filter(d => d)
				.map((theme, idx) => (
					<TextInput title={`Theme ${++idx}`} onChange={val => (persist.store.themes[theme[0]].url = val)} value={theme[1].url}>
						<Button
							onClick={() => {
								if (!theme[1]?.url) return;
								unloadTheme(theme[0]);
								loadTheme(theme[1].url, theme[0]);
								theme[1].applied = true;
							}}
						>
							Apply
						</Button>
						<Button onClick={() => unloadTheme(theme[0])}>Disable</Button>
						<Button
							onClick={() => {
								unloadTheme(theme[0]);
								delete persist.store.themes[theme[0]];
							}}
						>
							Remove
						</Button>
					</TextInput>
				))}
			<Button onClick={() => saveTheme(persist.store)}>Add Theme</Button>
		</div>
	);
};
