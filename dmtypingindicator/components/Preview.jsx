import { batchFind } from '@cumcord/modules/webpack';
import { persist } from '@cumcord/pluginData';

const [Card, { HomeButton }, { getUsers }, Text] = batchFind(f => {
  f.findByDisplayName('Card');
  f.findByProps('HomeButton');
  f.findByProps('getUsers');
  f.findByDisplayName('LegacyText');
});

export default () => {
  let [{ typingRotation, currentRotation }, setState] = React.useState({ typingRotation: null, currentRotation: 0 });
  let previewUsers = [];

  const fetchPreviewUsers = () => {
    const cachedUsers = Object.values(getUsers());
    const getRandomUserId = () => cachedUsers[Math.floor(Math.random() * cachedUsers.length)].id;
    const typingUsers = { 1337: {} };

    for (let i = 0; i < currentRotation + 1; i++) {
      const userId = previewUsers[i] || getRandomUserId();

      if (!previewUsers[i]) previewUsers[i] = userId;

      typingUsers['1337'][userId] = cachedUsers.find(user => user.id === userId);
    }

    const maxTypingUsers = persist.ghost.maxTypingUsers || 3;
    if (currentRotation === 3 && maxTypingUsers > 3) {
      for (let i = currentRotation++; i < maxTypingUsers + 1; i++) {
        const userId = getRandomUserId();
        typingUsers['1337'][userId] = cachedUsers.find(user => user.id === userId);
      }
    }

    return [Object.values(typingUsers['1337']).flat(), typingUsers];
  };

  const startTypingRotation = () => {
    if (!typingRotation) {
      typingRotation = setInterval(() => {
        currentRotation = (currentRotation + 1) % 4;

        if (currentRotation === 3) previewUsers = [];

        setState({ typingRotation, currentRotation });
      }, 10e3);
    }
  };

  const stopTypingRotation = () => clearInterval(typingRotation);

  React.useEffect(() => {
    startTypingRotation();
    return () => {
      stopTypingRotation();
    };
  }, []);

  const [typingUsers, typingUserFlat] = fetchPreviewUsers();

  return (
    <Card className='dmti-preview'>
      <Text size={Text.Sizes.SIZE_10}>Preview don't work for the moment</Text>
      <HomeButton user={'previewuser'} typingUsers={typingUsers} typingUserFlat={typingUserFlat} />
    </Card>
  );
};
