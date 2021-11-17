import { webpack } from '@cumcord/modules';
import { i18n } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import css from './style.css';

const injections = [];
const { default: Status } = webpack.findByProps('AnimatedAvatar');
const MemberList = webpack.find(m => m.default?.displayName === 'MemberListItem');
const Chat = webpack.find(m => m?.default?.toString?.().indexOf('ANIMATE_CHAT_AVATAR') > -1);
const { getStatus } = webpack.findByProps('getStatus', 'isMobileOnline');
const tooltips = {
	dnd: i18n.Messages.STATUS_DND,
	online: i18n.Messages.STATUS_ONLINE,
	idle: i18n.Messages.STATUS_IDLE,
	offline: i18n.Messages.STATUS_OFFLINE,
};

export default () => {
	return {
		onLoad() {
			injections.push(
				after('renderAvatar', MemberList.default.prototype, ([{ id }], res) => {
					res.props.status = getStatus(id);
					return res;
				})
			);

			injections.push(
				after(
					'default',
					Chat,
					(
						[
							{
								message: { author },
							},
						],
						res
					) => {
						const userstatus = getStatus(author.id);
						res.props.children[0].props.children = () => {
							const status = (
								<Status
									src={author.getAvatarURL()}
									className='avatar-1BDn8e se-chat'
									status={userstatus}
									statusTooltip={tooltips[userstatus]}
									size={Status.Sizes.SIZE_40}
								/>
							);
							return status;
						};
						return res;
					}
				)
			);

			injections.push(css());
		},
		onUnload() {
			injections.map(i => i());
		},
	};
};
