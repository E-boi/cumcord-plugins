import { Button, close, FormTitle, Modal } from '.';
import { updateDmList } from '../utils';
import TextInput from './TextInput';

export default ({ transitionState, dmId, settings }) => {
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
            const categories = settings.get('categories', []);
            categories.push({
              name,
              dms: [dmId],
              pos: categories.length,
              collapsed: false,
            });
            settings.set('categories', categories);
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
