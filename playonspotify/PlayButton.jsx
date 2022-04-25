import { findByDisplayName, findByProps } from '@cumcord/modules/webpack';
import { addToQueue, play } from './SpotifyApi';

const { Button } = findByDisplayName('MiniPopover', false);
const { TooltipContainer } = findByProps('TooltipContainer');

export const PlayButton = ({ uri, title, isTrack }) => (
  <TooltipContainer text='Play On Spotify' position='top'>
    <Button onClick={() => play({ uri, title }, isTrack)}>
      <svg viewBox='0 0 26 26' xmlns='http://www.w3.org/2000/svg' style={{ height: '20px' }}>
        <path
          d='M7.712 22.04a.732.732 0 0 1-.806.007.767.767 0 0 1-.406-.703V4.656c0-.31.135-.544.406-.703.271-.16.54-.157.806.006l14.458 8.332c.266.163.4.4.4.709 0 .31-.134.546-.4.71L7.712 22.04z'
          fill='currentColor'
          fill-rule='evenodd'
        ></path>
      </svg>
    </Button>
  </TooltipContainer>
);

export const QueueButton = ({ uri, title }) => (
  <TooltipContainer text='Add to Queue' position='top'>
    <Button onClick={() => addToQueue({ uri, title }, true)}>
      <svg xmlns='http://www.w3.org/2000/svg' height={20} width={20} viewBox='8 6 36 36'>
        <path
          fill='currentColor'
          d='M30 12H6v4h24v-4zm0 8H6v4h24v-4zM6 32h16v-4H6v4zm28-20v16.37c-.63-.23-1.29-.37-2-.37-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6V16h6v-4H34z'
        />
      </svg>
    </Button>
  </TooltipContainer>
);
