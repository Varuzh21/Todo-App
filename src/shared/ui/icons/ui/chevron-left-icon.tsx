import Svg, { Path, type SvgProps } from 'react-native-svg';

export function ChevronLeftIcon(props: SvgProps) {
	return (
		<Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
			<Path
				d='M10 3.5L5.5 8L10 12.5'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}
