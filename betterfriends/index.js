import Plugin from './PluginClass';

export default ({ persist }) => {
	return new Plugin(persist);
};
