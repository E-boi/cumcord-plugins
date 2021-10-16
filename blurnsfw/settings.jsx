import { useNest } from '@cumcord/utils';
import { Button, SwitchItem } from './components';
import Category from './components/Category';
import SliderInput from './components/SliderInput';
import TextInput from './components/TextInput';

export default ({ persist }) => {
	const [opened, setOpened] = React.useState();
	const [opened1, setOpened1] = React.useState();
	useNest(persist);
	return (
		<div>
			<SwitchItem note='Blur images/video in dms' value={persist.ghost.dm} onChange={() => (persist.store.dm = !persist.ghost.dm)}>
				Blur DMs
			</SwitchItem>

			<SwitchItem note='Blur images/video in group chats' value={persist.ghost.gc} onChange={() => (persist.store.gc = !persist.ghost.gc)}>
				Blur Group chats
			</SwitchItem>

			<SwitchItem
				note='Adds a more visible tags for nsfw channels'
				value={!persist.ghost.notags}
				onChange={() => (persist.store.notags = !persist.ghost.notags)}
			>
				NSFW Tags
			</SwitchItem>

			<SliderInput
				stickToMarkers
				minValue={1}
				maxValue={75}
				initialValue={persist.ghost.blur ?? 10}
				markers={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 65, 60, 70, 75]}
				onValueChange={val => (persist.store.blur = val)}
			>
				Blur effect
			</SliderInput>

			<SliderInput
				stickToMarkers
				minValue={0.2}
				maxValue={10}
				initialValue={persist.ghost.timing ?? 1}
				markers={[0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
				onValueChange={val => (persist.store.timing = val)}
			>
				Blur Timing (in seconds)
			</SliderInput>

			<Category opened={opened} onChange={() => setOpened(!opened)} title='Blocked channels (uneffected channels)'>
				{persist.ghost.blocked?.map((val, idx) => (
					<TextInput placeholder='Enter a channel/user id' value={val} onChange={val => (persist.store.blocked[idx] = val)}>
						{''}
						<Button color={Button.Colors.RED} onClick={() => (persist.store.blocked = persist.ghost.blocked.filter((_, i) => i !== idx))}>
							Remove
						</Button>
					</TextInput>
				))}
				<Button onClick={() => (persist.store.blocked = persist.ghost.blocked ? persist.ghost.blocked.concat('') : [''])}>Add channel</Button>
			</Category>

			<Category opened={opened1} onChange={() => setOpened1(!opened1)} title='Blur specific channels'>
				{persist.ghost.blurChannels?.map((val, idx) => (
					<TextInput placeholder='Enter a channel/user id' value={val} onChange={val => (persist.store.blurChannels[idx] = val)}>
						{''}
						<Button color={Button.Colors.RED} onClick={() => (persist.store.blurChannels = persist.ghost.blurChannels.filter((_, i) => i !== idx))}>
							Remove
						</Button>
					</TextInput>
				))}
				<Button onClick={() => (persist.store.blurChannels = persist.ghost.blurChannels ? persist.ghost.blurChannels.concat('') : [''])}>
					Add channel
				</Button>
			</Category>
		</div>
	);
};
