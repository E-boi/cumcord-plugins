import { FileIcon, FolderIcon } from '../components';

export default ({ dir, onClick, path }) => {
	return (
		<div className={path ? 'Gin-folder' : 'Gout-folder'}>
			{path && (
				<div className='Gpath'>
					<p>{`/${path}`}</p>
				</div>
			)}
			{dir?.map(tree => (
				<p
					className={
						tree.type === 'dir'
							? 'Gfolder'
							: `Gfile ${tree.name.split('.')[tree.name.split('.').length - 1]} ${tree.name.includes('.') ? '' : 'blank'}`
					}
				>
					{tree.type === 'dir'
						? [<img src={FolderIcon} height={16} width={16} />, <a onClick={() => onClick(tree.path, 'folder')}>{tree.name}</a>]
						: [<img src={FileIcon} height={16} width={16} />, <a onClick={() => onClick(tree.name, 'file')}>{tree.name}</a>]}
				</p>
			))}
		</div>
	);
};
