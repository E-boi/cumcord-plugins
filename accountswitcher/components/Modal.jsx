import { Button, Card, close, FormTitle, Modal, open, Pencil, Text, Tooltip } from '.';
import { webpack } from '@cumcord/modules';
import { useNest } from '@cumcord/utils';
import AddAccount from './AddAccount';
import EditAccount from './EditAccount';

const { getCurrentUser } = webpack.findByProps('getCurrentUser');
const { getToken } = webpack.findByProps('getToken');
const { loginToken } = webpack.findByProps('loginToken');

export default ({ persist }) => {
	const [showToken, setShow] = React.useState({});
	const [selected, setSelected] = React.useState();
	useNest(persist);
	return (
		<Modal className='acc-switch-modal'>
			<Modal.Header>
				<FormTitle tag='h3'>Accounts</FormTitle>
			</Modal.Header>
			<Modal.Content>
				{persist.ghost.accounts?.map((account, idx) => (
					<Card>
						<div
							className={`account ${selected === account.token && 'selected-account'}`}
							onClick={e => {
								if (
									e.target.type == 'button' ||
									e.target.parentElement.parentElement?.parentElement.type === 'button' ||
									e.target.parentElement.className === 'Token'
								)
									return;
								setSelected(account.token);
							}}
						>
							<img src={account.pfp} />
							<div className='account-details'>
								<div className='accountName'>
									{account.name}
									<Tooltip text='Edit' position='top'>
										<Pencil onClick={() => open(() => <EditAccount account={account} idx={idx} persist={persist} />)} />
									</Tooltip>
								</div>
								<div className='Token'>
									<Text className='tokenText'>Token:</Text>
									<Text
										className={`tokenValue ${showToken[account.token] && 'reveal'}`}
										onClick={() => setShow({ ...showToken, [account.token]: !showToken[account.token] })}
									>
										{account.token}
									</Text>
								</div>
							</div>
							<div className='account-buttons'>
								<Button
									onClick={() => {
										persist.store.accounts.splice(idx, 1);
									}}
									color={Button.Colors.RED}
									size={Button.Sizes.SMALL}
								>
									X
								</Button>
							</div>
						</div>
					</Card>
				))}
			</Modal.Content>
			<Modal.Footer>
				<Button color={selected ? Button.Colors.BRAND : Button.Colors.GREY} onClick={() => loginTo(selected)}>
					Switch
				</Button>
				<Button onClick={() => open(() => <AddAccount account={getCurrentAccount()} persist={persist} />)}>Add account</Button>
			</Modal.Footer>
		</Modal>
	);
};

function getCurrentAccount() {
	const user = getCurrentUser();

	return { name: user.tag, token: getToken(), pfp: user.getAvatarURL() };
}

function loginTo(token) {
	if (!token) return;
	if (getToken() === token) return;
	close();
	loginToken(token);
}
