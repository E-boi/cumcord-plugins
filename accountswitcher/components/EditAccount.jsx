import { Button, Card, close, FormTitle, Modal } from '.';
import TextInput from './TextInput';

export default ({ account: accountProp, idx, persist }) => {
	const [account, setAccount] = React.useState(accountProp);
	return (
		<Modal className='acc-switch-modal'>
			<Modal.Header>
				<FormTitle tag='h3'>Edit Account</FormTitle>
			</Modal.Header>
			<Modal.Content>
				<Card>
					<TextInput value={account.name} onChange={val => setAccount({ ...account, name: val })}>
						Name:
					</TextInput>
					<TextInput value={account.pfp} onChange={val => setAccount({ ...account, pfp: val })}>
						Profile:
					</TextInput>
					<TextInput value={account.token} onChange={val => setAccount({ ...account, token: val })}>
						Token:
					</TextInput>
				</Card>
			</Modal.Content>
			<Modal.Footer>
				<Button
					onClick={() => {
						persist.store.accounts[idx] = account;
						close();
					}}
				>
					Save
				</Button>
				<Button onClick={close}>Back</Button>
			</Modal.Footer>
		</Modal>
	);
};
