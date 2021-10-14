import { webpack } from '@cumcord/modules';
import { i18n } from '@cumcord/modules/common';
import { ArrowDown, ArrowUp } from '.';

const Flex = webpack.findByDisplayName('Flex');
const { Messages } = i18n;
const headers = webpack.findByProps('headerCell');
const SearchBar = webpack.findByDisplayName('SearchBar');
const updateList = () => {
	document.querySelector('.peopleList-3c4jOR').dispatchEvent(new Event('focusin'));
	setTimeout(() => document.querySelector('.peopleList-3c4jOR').dispatchEvent(new Event('focusout')));
};

export default ({ title, _this }) => {
	const [sortKey, setSortKey] = React.useState(_this.sortKey);
	const [sortReversed, setSortReversed] = React.useState(_this.sortReversed);
	const [query, setQuery] = React.useState(_this.searchQuery);

	return (
		<Flex align={Flex.Align.CENTER}>
			<div className={`ccbf-header ccbf-nameCell ${headers.headerCell}`}>
				<div className={headers.headerCellContent}>{title}</div>
			</div>
			{[
				{ key: 'usernameLower', label: Messages.FRIENDS_COLUMN_NAME },
				{ key: 'statusIndex', label: Messages.FRIENDS_COLUMN_STATUS },
				{ key: 'isFavorite', label: 'Favorite' },
			].map(data => (
				<div
					className={['ccbf-header ccbf-nameCell', headers.headerCell, sortKey === data.key && headers.headerCellSorted, headers.clickable].join(' ')}
					onClick={() => {
						if (sortKey === data.key) {
							if (!sortReversed) {
								setSortReversed(true);
								_this.sortReversed = true;
								updateList();
							} else {
								setSortKey('');
								setSortReversed(false);
								_this.sortKey = '';
								_this.sortReversed = false;
								updateList();
							}
						} else {
							setSortKey(data.key);
							setSortReversed(false);
							_this.sortKey = data.key;
							_this.sortReversed = false;
							updateList();
						}
					}}
				>
					<div className={headers.headerCellContent}>
						{data.label}
						{sortKey === data.key && sortReversed ? <ArrowDown className={headers.sortIcon} /> : <ArrowUp className={headers.sortIcon} />}
					</div>
				</div>
			))}
			<SearchBar
				query={query}
				placeholder='name'
				onChange={c => {
					setQuery(c);
					_this.searchQuery = c;
					setTimeout(() => updateList(), 100);
				}}
				onClear={() => {
					setQuery('');
					_this.searchQuery = '';
				}}
			/>
		</Flex>
	);
};
