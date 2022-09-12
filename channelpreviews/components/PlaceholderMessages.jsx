import { batchFind } from '@cumcord/modules/webpack';

const [{ generateMessageSpecs, default: Placeholders }] = batchFind(f => {
  f.findByProps('generateMessageSpecs');
});

export default ({ amount }) => {
  const [specs, setSpecs] = React.useState(null);

  React.useEffect(() => {
    setSpecs(
      generateMessageSpecs({
        compact: false,
        fontSize: 16,
        messageGroups: amount,
        groupSpacing: 16,
        groupRange: 3,
      })
    );
  }, []);

  if (!specs) return null;
  return (
    <Placeholders
      compact={false}
      messages={specs.messages}
      attachmentSpecs={specs.attachmentSpecs}
      totalHeight={specs.totalHeight}
      groupSpacing={specs.groupSpacing}
    />
  );
};
