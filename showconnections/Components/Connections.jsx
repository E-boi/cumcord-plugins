import { webpack } from '@cumcord/modules';
import Connection from './Connection';

const classes = {
  ...webpack.findByProps('bodyTitle', 'note'),
  ...webpack.findByProps('scrollbarGhostHairline'),
  ...webpack.findByProps('title', 'body'),
};
const { getUserProfile } = webpack.findByProps('getUserProfile');
const { Heading } = webpack.findByProps('Heading');

export default ({ user, skin }) => {
  const connections = getUserProfile(user).connectedAccounts;
  if (!connections?.length > 0) return null;

  return [
    <Heading className={skin ? classes.title : classes.bodyTitle} color={!skin && 'header-secondary'} level={3} variant='eyebrow'>
      Connections
    </Heading>,
    <div className={`sc-connectAccounts ${classes.scrollbarGhostHairline}`}>
      {connections.map(account => (
        <Connection account={account} />
      ))}
    </div>,
  ];
};
