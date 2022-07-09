import { batchFind } from '@cumcord/modules/webpack';

const [{ NumberBadge }, { badge }, Tooltip] = batchFind(({ findByProps, findByDisplayName }) => {
  findByProps('NumberBadge');
  findByProps('badge', 'tabBar');
  findByDisplayName('Tooltip');
});

export default ({ count, tooltip }) => (
  <Tooltip text={tooltip} position='bottom'>
    {e => (
      <div {...e}>
        <NumberBadge count={count} className={badge} style={{ padding: '0px' }} />
      </div>
    )}
  </Tooltip>
);
