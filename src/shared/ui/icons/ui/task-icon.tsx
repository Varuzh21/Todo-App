import Svg, { Path, type SvgProps } from 'react-native-svg';

export function TaskIcon(props: SvgProps) {
	return (
		<Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...props}>
			<Path
				d='M10.3083 7.40002H14.6834'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M5.31665 7.40002L5.94165 8.02502L7.81665 6.15002'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M10.3083 13.2333H14.6834'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M5.31665 13.2333L5.94165 13.8583L7.81665 11.9833'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M7.49996 18.3333H12.5C16.6666 18.3333 18.3333 16.6666 18.3333 12.5V7.49996C18.3333 3.33329 16.6666 1.66663 12.5 1.66663H7.49996C3.33329 1.66663 1.66663 3.33329 1.66663 7.49996V12.5C1.66663 16.6666 3.33329 18.3333 7.49996 18.3333Z'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}
