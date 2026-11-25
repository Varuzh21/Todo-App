import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

export function SearchIcon(props: SvgProps) {
	return (
		<Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...props}>
			<Circle cx={9} cy={9} r={6.25} stroke='currentColor' strokeWidth={1.5} />
			<Path
				d='M13.5 13.5L17 17'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
			/>
		</Svg>
	);
}
