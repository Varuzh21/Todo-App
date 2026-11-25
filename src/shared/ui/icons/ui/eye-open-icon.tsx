import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

// Strokes use currentColor, so pass `color` to tint the icon.
export function EyeOpenIcon(props: SvgProps) {
	return (
		<Svg width={16} height={10} viewBox='0 0 16 10' fill='none' {...props}>
			<Path
				d='M1 5C3.5 1.3 12.5 1.3 15 5C12.5 8.7 3.5 8.7 1 5Z'
				stroke='currentColor'
				strokeWidth={1.2}
				strokeLinejoin='round'
			/>
			<Circle cx={8} cy={5} r={1.8} stroke='currentColor' strokeWidth={1.2} />
		</Svg>
	);
}
