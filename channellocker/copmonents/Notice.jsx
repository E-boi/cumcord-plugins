import { batchFind } from '@cumcord/modules/webpack';
import { useNest } from '@cumcord/utils';
import { persist } from '@cumcord/pluginData';
import { Button } from '../../Components';

const [{ Heading }, classes] = batchFind(e => {
  e.findByProps('Heading');
  e.findByProps('title', 'animation');
});

export default ({ onClick, children, channel }) => {
  useNest(persist);
  const isLocked = (persist.ghost.global && 2) || (persist.ghost.channels[channel.id] && 1);

  if (isLocked)
    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Heading variant='heading-md/medium' className={classes.title}>
            {isLocked === 2
              ? 'You currently have the text area locked. Unlock it to speak.'
              : 'You currently have this channel locked. Unlock this channel to speak in it.'}
          </Heading>
        </div>
        <Button className={classes.buttonContainer} size={Button.Sizes.SMALL} color={Button.Colors.PRIMARY} onClick={() => onClick?.(isLocked)}>
          Unlock
        </Button>
      </div>
    );
  else return children;
};
