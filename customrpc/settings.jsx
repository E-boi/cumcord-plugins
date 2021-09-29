import { webpack } from '@cumcord/modules';
import { useNest } from '@cumcord/utils';
import TextInput from './components/TextInput';
import Category from './components/Category';
import { SwitchItem, Text, UserPopout } from './components';
import SelectInput from './components/SelectInput';

const { getCurrentUser } = webpack.findByProps('getCurrentUser');
const { getAssets } = webpack.findByProps('getAssets');
const classes = {
	...webpack.findByProps('h5'),
	...webpack.findByProps('marginBottom20'),
};
const configs = [
	{ label: 'rpc 1', value: 'rpc1' },
	{ label: 'rpc 2', value: 'rpc2' },
	{ label: 'rpc 3', value: 'rpc3' },
];

async function getImages(id) {
	const assets = await getAssets(id);
	const images = Object.values(assets).filter(a => a.type === 1);
	images.unshift({ name: '' });
	return images;
}

export default ({ persist, reloadRPC }) => {
	const [opened1, changeOpened1] = React.useState(false);
	const [opened2, changeOpened2] = React.useState(false);
	const [assets, setAssets] = React.useState();
	useNest(persist);
	const selected = persist.ghost.selected;
	const rpc = persist.ghost[selected];
	if (!assets)
		getImages(rpc.client_id)
			.then(assets => setAssets(assets))
			.catch(() => {});
	return (
		<div>
			<SelectInput
				value={selected}
				options={configs}
				onChange={val => {
					persist.store.selected = val.value;
					getImages(persist.ghost[val.value].client_id)
						.then(assets => setAssets(assets))
						.catch(() => {});
					reloadRPC(persist.ghost);
				}}
			>
				Rpc Config
			</SelectInput>

			<SwitchItem
				value={persist.ghost.disable ?? false}
				onChange={() => {
					persist.store.disable = !persist.ghost.disable;
					reloadRPC(persist.ghost);
				}}
			>
				Disabled
			</SwitchItem>

			<SwitchItem
				value={rpc.show_time ?? true}
				onChange={() => {
					persist.store[selected].show_time = !rpc.show_time;
					reloadRPC(persist.ghost);
				}}
			>
				Show Time
			</SwitchItem>

			<TextInput
				required
				value={rpc.client_id}
				onChange={val => {
					persist.store[selected].client_id = val;
					getImages(persist.ghost[selected].client_id)
						.then(assets => setAssets(assets))
						.catch(() => {});
					reloadRPC(persist.ghost);
				}}
			>
				Client ID
			</TextInput>

			<TextInput
				value={rpc.name}
				onChange={val => {
					persist.store[selected].name = val;
					reloadRPC(persist.ghost);
				}}
			>
				Name
			</TextInput>

			<TextInput
				value={rpc.details}
				onChange={val => {
					persist.store[selected].details = val;
					reloadRPC(persist.ghost);
				}}
			>
				Details
			</TextInput>

			<TextInput
				value={rpc.state}
				onChange={val => {
					persist.store[selected].state = val;
					reloadRPC(persist.ghost);
				}}
			>
				State
			</TextInput>

			<Category
				title='Images'
				opened={opened1}
				onChange={() => {
					changeOpened1(!opened1);
					changeOpened2(false);
				}}
			>
				{assets && (
					<SelectInput
						value={rpc.large_image}
						options={assets.map(asset => ({ label: asset.name, value: asset.name }))}
						onChange={val => {
							persist.store[selected].large_image = val.value;
							reloadRPC(persist.ghost);
						}}
					>
						Large Image
					</SelectInput>
				)}
				{assets && (
					<SelectInput
						value={rpc.small_image ?? ''}
						options={assets.map(asset => ({ label: asset.name, value: asset.name }))}
						onChange={val => {
							persist.store[selected].small_image = val.value;
							reloadRPC(persist.ghost);
						}}
					>
						Small Image
					</SelectInput>
				)}

				<TextInput
					value={rpc.large_text}
					onChange={val => {
						persist.store[selected].large_text = val;
						reloadRPC(persist.ghost);
					}}
				>
					Large Image Tooltip
				</TextInput>

				<TextInput
					value={rpc.small_text}
					onChange={val => {
						persist.store[selected].small_text = val;
						reloadRPC(persist.ghost);
					}}
				>
					Small Image Tooltip
				</TextInput>
			</Category>

			<Category
				title='Buttons'
				opened={opened2}
				onChange={() => {
					changeOpened2(!opened2);
					changeOpened1(false);
				}}
			>
				<TextInput
					value={rpc.button1?.label ?? ''}
					onChange={val => {
						persist.store[selected].button1.label = val;
						reloadRPC(persist.ghost);
					}}
				>
					Button 1 Text
				</TextInput>

				<TextInput
					value={rpc.button1?.url ?? ''}
					onChange={val => {
						persist.store[selected].button1.url = val;
						reloadRPC(persist.ghost);
					}}
				>
					Button 1 Url
				</TextInput>

				<TextInput
					value={rpc.button2?.label ?? ''}
					onChange={val => {
						persist.store[selected].button2.label = val;
						reloadRPC(persist.ghost);
					}}
				>
					Button 2 Text
				</TextInput>

				<TextInput
					value={rpc.button2?.url ?? ''}
					onChange={val => {
						persist.store[selected].button2.url = val;
						reloadRPC(persist.ghost);
					}}
				>
					Button 2 Url
				</TextInput>
			</Category>

			<Text className={`${classes.h5} ${classes.marginBottom4}`}>Your RPC:</Text>
			<div className={classes.marginBottom20} style={{ backgroundColor: 'var(--background-floating)' }}>
				<UserPopout user={getCurrentUser()} />
			</div>
		</div>
	);
};
