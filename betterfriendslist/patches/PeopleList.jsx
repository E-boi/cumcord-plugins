import { batchFind } from '@cumcord/modules/webpack';
import { Messages } from '@cumcord/modules/common/i18n';
import { after } from '@cumcord/patcher';
import SectionTitle from '../components/SectionTitle';
import { persist } from '@cumcord/pluginData';

const [PeopleList, Flex] = batchFind(({ findByDisplayName }) => {
  findByDisplayName('PeopleList', false);
  findByDisplayName('Flex');
});

const sortOptions = [
  { key: 'usernameLower', label: Messages.FRIENDS_COLUMN_NAME, sort: false, reversed: false },
  { key: 'statusIndex', label: 'Status', sort: false, reversed: false },
];
const statusSortOrder = {
  online: 0,
  streaming: 1,
  idle: 2,
  dnd: 3,
  offline: 4,
  invisible: 5,
  unknown: 6,
};

export default () => {
  const peoplelist = after('default', PeopleList, (_, res) => {
    if (!Array.isArray(res.props.children) || persist.ghost.sort) return res;
    res.props.children.unshift(
      <Flex align={Flex.Align.CENTER} className='title'>
        {res.props.children[1].props.children}
        {sortOptions.map(data => (
          <SectionTitle
            title={data.label}
            sort={data.sort}
            reversed={data.reversed}
            onClick={() => {
              if (!data.sort) data.sort = true;
              else if (!data.reversed) data.reversed = !data.reversed;
              else {
                data.sort = false;
                data.reversed = false;
              }
              res.props.children[0].props.children[2].props.onChange(res.props.children[0].props.children[2].props.query);
            }}
          />
        ))}
        {res.props.children[0]}
      </Flex>
    );
    res.props.children.splice(1, 1);
    res.props.children.splice(1, 1);
    if (!res.props.children[1]?.props.statusSections) return res;
    res.props.children[1].props.statusSections = [].concat(res.props.children[1].props.statusSections).map(section => {
      if (!section?.[0]?.key) return section;
      let newSection = [].concat(section);
      newSection = newSection.map(user =>
        Object.assign({}, user, {
          statusIndex: statusSortOrder[user.status],
        })
      );
      sortOptions.forEach(data => {
        if (!data.sort) return;
        newSection.sort((x, y) => {
          let xValue = x[data.key],
            yValue = y[data.key];
          return xValue < yValue ? -1 : xValue > yValue ? 1 : 0;
        });
        if (data.reversed) newSection.reverse();
      });

      return newSection;
    });
    return res;
  });

  return () => {
    peoplelist();
  };
};
