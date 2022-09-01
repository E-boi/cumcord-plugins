import { webpack } from '@cumcord/modules';
import Connection from './Connection';

const classes = {
  ...webpack.findByProps('bodyTitle', 'note'),
  ...webpack.findByProps('scrollbarGhostHairline'),
  ...webpack.findByProps('title', 'body'),
};
const { fetchProfile } = webpack.findByProps('fetchProfile');
const { Heading } = webpack.findByProps('Heading');

export default ({ user, skin }) => {
  const [connections, setConnections] = React.useState();

  if (!connections) fetchProfile(user, 'cumcord', user => setConnections(user.connected_accounts));

  if (!connections?.length > 0) return null;
  return [
    <Heading className={skin ? classes.title : classes.bodyTitle} color={!skin && 'header-secondary'} level={3} variant='eyebrow'>
      Connections
    </Heading>,
    // <h3 className={[classes.base, classes.muted, classes.uppercase, classes.size12, classes.bodyTitle].join(' ')}>Connections</h3>,
    <div className={`sc-connectAccounts ${classes.scrollbarGhostHairline}`}>
      {connections.map(account => (
        <Connection account={account} />
      ))}
    </div>,
  ];
};
