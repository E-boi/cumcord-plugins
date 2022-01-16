import { Button, Card, FormTitle, Modal } from '.';
import TextInput from './TextInput';
import { persist } from '@cumcord/pluginData';

export default ({ account: accountProp, onClose: close, transitionState }) => {
  const [account, setAccount] = React.useState(accountProp);
  return (
    <Modal.ModalRoot transitionState={transitionState} className='acc-switch-modal'>
      <Modal.ModalHeader>
        <FormTitle tag='h3'>Add Account</FormTitle>
      </Modal.ModalHeader>
      <Modal.ModalContent>
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
      </Modal.ModalContent>
      <Modal.ModalFooter>
        <Button
          onClick={() => {
            persist.store.accounts.push(account);
            close();
          }}
        >
          Save
        </Button>
        <Button onClick={close}>Back</Button>
      </Modal.ModalFooter>
    </Modal.ModalRoot>
  );
};
