import { Button, close, FormTitle, Modal } from '.';
import { getSetting, setSetting, updateDmList } from '../utils';
import TextInput from './TextInput';

export default ({ transitionState, dmId }) => {
  const [name, setName] = React.useState('');
  return (
    <Modal.ModalRoot transitionState={transitionState}>
      <Modal.ModalHeader>
        <FormTitle tag='h3'>New Catgory</FormTitle>
      </Modal.ModalHeader>
      <Modal.ModalContent>
        <TextInput placeholder='Category name' value={name} onChange={setName}>
          New Category:
        </TextInput>
      </Modal.ModalContent>
      <Modal.ModalFooter>
        <Button
          disabled={!name}
          onClick={() => {
            const categories = getSetting('categories', []);
            categories.push({
              name,
              dms: [dmId],
              pos: categories.length,
              collapsed: false,
            });
            setSetting('categories', categories);
            close();
            updateDmList();
          }}
        >
          Save
        </Button>
      </Modal.ModalFooter>
    </Modal.ModalRoot>
  );
};
