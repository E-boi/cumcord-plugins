import { findByProps } from '@cumcord/modules/webpack';
import { showToast } from '@cumcord/ui/toasts';

const { getActiveSocketAndDevice } = findByProps('getActiveSocketAndDevice');
const URL = 'https://api.spotify.com/v1/me/player';
const getAccessToken = () => getActiveSocketAndDevice()?.socket?.accessToken;

export const addToQueue = ({ title, uri }, toast) => {
  if (!getAccessToken()) return;
  fetch(`${URL}/queue?uri=${uri}`, { headers: { authorization: `Bearer ${getAccessToken()}` }, method: 'POST' }).then(
    res => res.ok && toast && showToast({ title: `Queued: ${title}` })
  );
};

export function play({ title, uri }, addtoqueue) {
  const accessToken = getAccessToken();
  if (!accessToken) return;
  if (addtoqueue)
    addToQueue({ uri })
      .then(() => fetch(`${URL}/next`, { headers: { authorization: `Bearer ${accessToken}` }, method: 'POST' }))
      .then(res => res.ok && showToast({ title: `Now playing: ${title}`, duration: 3000 }));
  else
    fetch(`${URL}/play`, {
      headers: { authorization: `Bearer ${accessToken}` },
      method: 'PUT',
      body: JSON.stringify({ context_uri: uri }),
    });
}
