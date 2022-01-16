import { Button, Card, FormTitle, Modal } from '.';
import { persist } from '@cumcord/pluginData';
import TextInput from './TextInput';

export default ({ account: accountProp, idx, onClose: close, transitionState }) => {
  const [account, setAccount] = React.useState(accountProp);
  return (
    <Modal.ModalRoot transitionState={transitionState} className='acc-switch-modal'>
      <Modal.ModalHeader>
        <FormTitle tag='h3'>Edit Account</FormTitle>
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
            persist.store.accounts[idx] = account;
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
