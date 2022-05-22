import { persist } from '@cumcord/pluginData';
import { findByProps } from '@cumcord/modules/webpack';
import { useState, useEffect } from 'react';
import { Flex, Text, SwitchItem, Modal, Header } from '.';
import TextInput from './TextInput';
import Category from './Category';
import UserActivities from './UserActivities';
import Save from './Save';
import { getAssets, setRPC as updateRPC } from '../utils';
import SelectInput from './SelectInput';

const { getCurrentUser } = findByProps('getCurrentUser');
const classes = {
  ...findByProps('h5'),
  ...findByProps('marginBottom20'),
};

const AutoWrap = ({ children, grow, shrink, wrap }) => {
  if (!Array.isArray(children)) children = [children];
  return children.map(child => (
    <Flex.Child wrap={wrap} grow={grow || 1} shrink={shrink || 1}>
      {child}
    </Flex.Child>
  ));
};

export default ({ rpcName, transitionState, onClose }) => {
  const [openedB, setOpenB] = useState();
  const [openedI, setOpenI] = useState();
  const [changes, setChanges] = useState();
  const [assets, setAssets] = useState();
  const [rpc, setRPC] = useState(Object.assign({}, persist.ghost.rpcs[rpcName]));

  useEffect(() => {
    // for some reason without doing this any changes to "buttons" is going to persist when the change is made and i dont want that until the user saves the changes
    rpc.buttons = rpc.buttons.map(b => ({ label: b.label, url: b.url }));
  });

  const update = updateRPC => {
    const r = updateRPC || rpc;
    setRPC(Object.assign({}, r));
    if (_.isEqual(Object.assign({}, persist.ghost.rpcs[rpcName]), r)) setChanges(false);
    else setChanges(true);
  };

  if (!assets)
    getAssets(rpc.client_id)
      .then(assets => setAssets(assets))
      .catch(() => {});

  return (
    <Modal.ModalRoot className='crpc-edit' transitionState={transitionState}>
      <Modal.ModalHeader separator={false}>
        <AutoWrap>
          <Header size={Header.Sizes.SIZE_20} tag='h2'>
            Edit RPC
          </Header>
          <Modal.ModalCloseButton onClick={onClose} />
        </AutoWrap>
      </Modal.ModalHeader>
      <Modal.ModalContent>
        <Flex wrap={Flex.Wrap.WRAP}>
          <Flex.Child wrap>
            <Flex wrap={Flex.Wrap.WRAP}>
              <AutoWrap wrap grow={0} shrink={0}>
                <TextInput
                  required
                  noDivider
                  value={rpc.client_id}
                  onChange={val => {
                    rpc.client_id = val;
                    update();
                  }}
                >
                  Client id
                </TextInput>
                <TextInput
                  noDivider
                  value={rpc.name}
                  onChange={val => {
                    rpc.name = val;
                    update();
                  }}
                >
                  Name
                </TextInput>
                <TextInput
                  noDivider
                  value={rpc.details}
                  onChange={val => {
                    rpc.details = val;
                    update();
                  }}
                >
                  Details
                </TextInput>
                <TextInput
                  noDivider
                  value={rpc.state}
                  onChange={val => {
                    rpc.state = val;
                    update();
                  }}
                >
                  State
                </TextInput>
              </AutoWrap>

              <Flex.Child>
                <SwitchItem
                  value={rpc.show_time}
                  onChange={() => {
                    rpc.show_time = !rpc.show_time;
                    update();
                  }}
                >
                  Show Time
                </SwitchItem>

                <Category title='Images' opened={openedI} onChange={() => !setOpenI(!openedI) && setOpenB(false)}>
                  <Flex wrap={Flex.Wrap.WRAP}>
                    <AutoWrap wrap grow={1} shrink={1}>
                      {assets && (
                        <SelectInput
                          value={rpc.large_image}
                          options={assets}
                          onChange={val => {
                            rpc.large_image = val.value;
                            update();
                          }}
                        >
                          Large Image
                        </SelectInput>
                      )}
                      <TextInput
                        value={rpc.large_text}
                        onChange={val => {
                          rpc.large_text = val;
                          update();
                        }}
                      >
                        Large Image Text
                      </TextInput>
                    </AutoWrap>
                  </Flex>

                  <Flex wrap={Flex.Wrap.WRAP}>
                    <AutoWrap wrap grow={1} shrink={1}>
                      {assets && (
                        <SelectInput
                          value={rpc.small_image}
                          options={assets}
                          onChange={val => {
                            rpc.small_image = val.value;
                            update();
                          }}
                        >
                          Small Image
                        </SelectInput>
                      )}
                      <TextInput
                        value={rpc.small_text}
                        onChange={val => {
                          rpc.small_text = val;
                          update();
                        }}
                      >
                        Small Image Text
                      </TextInput>
                    </AutoWrap>
                  </Flex>
                </Category>

                <Category title='Buttons' opened={openedB} onChange={() => !setOpenB(!openedB) && setOpenI(false)}>
                  {rpc.buttons.map((button, idx) => (
                    <Flex wrap={Flex.Wrap.WRAP}>
                      <AutoWrap wrap grow={1} shrink={1}>
                        <TextInput
                          value={button.url}
                          placeholder='https://'
                          onChange={val => {
                            rpc.buttons[idx].url = val;
                            update();
                          }}
                        >
                          Button {idx + 1} URL
                        </TextInput>
                        <TextInput
                          value={button.label}
                          onChange={val => {
                            rpc.buttons[idx].label = val;
                            update();
                          }}
                        >
                          Button {idx + 1} Text
                        </TextInput>
                      </AutoWrap>
                    </Flex>
                  ))}
                </Category>

                <Text className={`${classes.h5} ${classes.marginBottom8}`}>Your RPC:</Text>
                <div className={classes.marginBottom20} style={{ backgroundColor: 'var(--background-floating)' }}>
                  <UserActivities user={getCurrentUser()} />
                </div>
              </Flex.Child>
            </Flex>
          </Flex.Child>
        </Flex>
        {changes && (
          <Save
            onReset={() => {
              update(persist.ghost.rpcs[rpcName]);
            }}
            onSave={() => {
              persist.store.rpcs[rpcName] = rpc;
              update();
              if (persist.ghost.selected === rpcName) updateRPC(rpc);
            }}
          />
        )}
      </Modal.ModalContent>
    </Modal.ModalRoot>
  );
};
