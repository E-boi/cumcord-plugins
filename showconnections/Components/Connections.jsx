import { webpack } from '@cumcord/modules';
import Connection from './Connection';

const classes = {
	...webpack.findByProps('base', 'muted'),
	...webpack.findByProps('size12'),
	...webpack.findByProps('bodyTitle'),
	...webpack.findByProps('scrollbarGhostHairline'),
};
const { fetchProfile } = webpack.findByProps('fetchProfile');

export default ({ user }) => {
	const [connections, setConnections] = React.useState();

	if (!connections) fetchProfile(user, 'cumcord', user => setConnections(user.connected_accounts));

	if (!connections?.length > 0) return null;
	console.log(connections);
	return [
		<h3 className={[classes.base, classes.muted, classes.uppercase, classes.size12, classes.bodyTitle].join(' ')}>Connections</h3>,
		<div className={`sc-connectAccounts ${classes.scrollbarGhostHairline}`}>
			{connections.map(account => (
				<Connection account={account} />
			))}
		</div>,
	];
};
