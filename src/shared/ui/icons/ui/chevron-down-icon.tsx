import Svg, { Path, type SvgProps } from 'react-native-svg';

export function ChevronDownIcon(props: SvgProps) {
	return (
		<Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
			<Path
				d='M3.5 6L8 10.5L12.5 6'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}
