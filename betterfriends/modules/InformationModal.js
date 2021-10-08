import { FluxDispatcher } from '@cumcord/modules/common';

export default function () {
	const _this = this;
	const listener = ({ message }) => {
		if (this.FAVORITE_FRIENDS.some(f => f.id === message.author.id)) {
			this.FRIEND_DATA.lastMessageID[message.author.id] = {
				id: message.id,
				channel: message.channel_id,
			};
		}
	};
	this.injections['InformationModal'].push(() => FluxDispatcher.unsubscribe('MESSAGE_CREATE', listener));
	if (this.settings.get('infomodal')) FluxDispatcher.subscribe('MESSAGE_CREATE', listener);
	else FluxDispatcher.unsubscribe('MESSAGE_CREATE', listener);
}
