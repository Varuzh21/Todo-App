import Svg, { Path, type SvgProps } from 'react-native-svg';

export function ChevronRightIcon(props: SvgProps) {
	return (
		<Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
			<Path
				d='M6 3.5L10.5 8L6 12.5'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}
