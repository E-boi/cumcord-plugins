import { webpack } from '@cumcord/modules';

const parser = webpack.findByProps('parse', 'parseTopic');

export default ({ file, path }) => {
	return (
		<div>
			<div className='Gpath'>
				<p>{`/${path}`}</p>
			</div>
			{file.isImage ? (
				<div className='Gimg scrollbarGhostHairline-1mSOM1'>
					<img src={`data:${file.type};base64,${file.content}`} />
				</div>
			) : (
				parser.defaultRules.codeBlock.react({ content: file.content, lang: file.type }, null, {})
			)}
		</div>
	);
};
