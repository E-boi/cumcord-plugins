import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';
import Divider from './Divider';

const classes = {
  ...findByProps('wrapper', 'base'),
  ...findByProps('flex'),
  ...findByProps('size20'),
  ...findByProps('marginBottom20'),
  ...findByProps('dividerDefault'),
};

const ArrowDown = findByDisplayName('ArrowDropDown');
const ArrowUp = findByDisplayName('ArrowDropUp');
const Text = findByDisplayName('LegacyText');

export default ({ opened, className, children, title, onClick }) => {
  if (!Array.isArray(children)) children = [children];
  return (
    <div className={className}>
      <div style={{ width: '100%' }} onClick={() => onClick?.()} className={[classes.flex, classes.alignCenter, classes.marginBottom8].join(' ')}>
        {opened ? <ArrowUp className={classes.base} width={32} height={32} /> : <ArrowDown className={classes.base} width={32} height={32} />}
        <Text className={[classes.base, classes.size16, classes.marginLeft8].join(' ')}>{title}</Text>
      </div>
      {opened ? <div className={[classes.marginLeft8, classes.marginBottom20].join(' ')}>{[...children]}</div> : null}
      {!opened && <Divider className={classes.marginBottom20} />}
    </div>
  );
};
