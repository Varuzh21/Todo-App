import Svg, { Path, type SvgProps } from 'react-native-svg';

export function PlusIcon(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
			<Path
				d='M12 4V20M4 12H20'
				stroke='currentColor'
				strokeWidth={2.5}
				strokeLinecap='round'
			/>
		</Svg>
	);
}
