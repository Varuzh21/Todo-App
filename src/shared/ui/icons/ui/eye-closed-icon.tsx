import Svg, { Path, type SvgProps } from 'react-native-svg';

// Strokes use currentColor, so pass `color` to tint the icon.
export function EyeClosedIcon(props: SvgProps) {
	return (
		<Svg width={16} height={8} viewBox='0 0 16 8' fill='none' {...props}>
			<Path
				d='M1 1C4.5 5.2 11.5 5.2 15 1'
				stroke='currentColor'
				strokeWidth={1.2}
				strokeLinecap='round'
			/>
			<Path
				d='M2.6 3.4L1.2 5.4M6.2 4.3L5.8 7.2M9.8 4.3L10.2 7.2M13.4 3.4L14.8 5.4'
				stroke='currentColor'
				strokeWidth={1.2}
				strokeLinecap='round'
			/>
		</Svg>
	);
}
