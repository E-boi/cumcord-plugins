import TextInput from './components/TextInput';
import { useNest } from '@cumcord/utils';

export default ({ persist }) => {
	useNest(persist);
	return (
		<div>
			<TextInput value={persist.ghost.apikey} onChange={val => (persist.store.apikey = val)}>
				Api key
			</TextInput>
			<p>
				<a href='https://github.com/settings/tokens/new?description=GitHub%20in%20Discord&scopes=public_repo' target='_blank'>
					Make a token (just scroll down and click generate token and copy and paste the token)
				</a>
			</p>
		</div>
	);
};
