import { batchFind } from '@cumcord/modules/webpack';

const [SectionTitle, Flex, ArrowDropDown, ArrowDropUp, { sortIcon, clickable, headerCell, headerCellContent }] = batchFind(
  ({ findByDisplayName, findByProps }) => {
    findByDisplayName('SectionTitle');
    findByDisplayName('Flex');
    findByDisplayName('ArrowDropDown');
    findByDisplayName('ArrowDropUp');
    findByProps('headerCellSorted', 'sortIcon');
  }
);

export default ({ title, onClick, reversed, sort }) => {
  const [r, setR] = React.useState(reversed);
  const [s, setS] = React.useState(sort);

  return (
    <div
      onClick={() => {
        if (!s) setS(true);
        else if (!r) setR(true);
        else {
          setS(false);
          setR(false);
        }
        onClick?.();
      }}
      className={[clickable, headerCell, headerCellContent, 'ccbfl-title'].join(' ')}
    >
      {title}
      {s ? r ? <ArrowDropUp className={sortIcon} /> : <ArrowDropDown className={sortIcon} /> : null}
    </div>
  );
};
