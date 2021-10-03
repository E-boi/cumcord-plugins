import { webpack } from '@cumcord/modules';

const parser = webpack.findByProps('parse', 'parseTopic');
const classes = {
	markup: cumcord.modules.webpack.findByProps('markup').markup,
	scrollbarGhostHairline: cumcord.modules.webpack.findByProps('scrollbarGhostHairline').scrollbarGhostHairline,
};

export default ({ file, path }) => {
	return (
		<div className={classes.markup}>
			<div className='Gpath'>
				<p>{`/${path}`}</p>
			</div>
			{file.isImage ? (
				<div className={`Gimg ${classes.scrollbarGhostHairline}`}>
					<img src={`data:${file.type};base64,${file.content}`} />
				</div>
			) : (
				parser.defaultRules.codeBlock.react({ content: file.content, lang: file.type }, null, {})
			)}
		</div>
	);
};
