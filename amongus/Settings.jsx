import { useNest } from '@cumcord/utils';
import SliderInput from './components/SliderInput';

export default ({ updateVolume, persist, sussy }) => {
	useNest(persist);
	return (
		<div>
			<SliderInput
				minValue={0}
				maxValue={100}
				initialValue={(persist.ghost.volume ?? 1) * 100}
				markers={[0, 50, 100]}
				onValueChange={val => {
					persist.store.volume = val / 100;
					updateVolume(persist.ghost.volume, sussy);
				}}
			>
				Volume
			</SliderInput>
		</div>
	);
};
