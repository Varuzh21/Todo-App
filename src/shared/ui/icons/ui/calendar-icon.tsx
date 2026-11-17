import Svg, { Path, type SvgProps } from 'react-native-svg';

export function CalendarIcon(props: SvgProps) {
	return (
		<Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...props}>
			<Path
				d='M6.66669 1.66666V4.16666'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M13.3333 1.66666V4.16666'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M13.3333 2.91666C16.1083 3.06666 17.5 4.12499 17.5 8.04166V13.1917C17.5 16.625 16.6667 18.3417 12.5 18.3417H7.5C3.33333 18.3417 2.5 16.625 2.5 13.1917V8.04166C2.5 4.12499 3.89167 3.07499 6.66667 2.91666H13.3333Z'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M17.2916 14.6667H2.70831'
				stroke='currentColor'
				strokeWidth={1.5}
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M10 6.875C8.97502 6.875 8.10835 7.43333 8.10835 8.51667C8.10835 9.03333 8.35002 9.425 8.71669 9.675C8.20835 9.975 7.91669 10.4583 7.91669 11.025C7.91669 12.0583 8.70835 12.7 10 12.7C11.2834 12.7 12.0834 12.0583 12.0834 11.025C12.0834 10.4583 11.7917 9.96667 11.275 9.675C11.65 9.41667 11.8834 9.03333 11.8834 8.51667C11.8834 7.43333 11.025 6.875 10 6.875ZM10 9.24167C9.56669 9.24167 9.25002 8.98333 9.25002 8.575C9.25002 8.15833 9.56669 7.91667 10 7.91667C10.4334 7.91667 10.75 8.15833 10.75 8.575C10.75 8.98333 10.4334 9.24167 10 9.24167ZM10 11.6667C9.45002 11.6667 9.05002 11.3917 9.05002 10.8917C9.05002 10.3917 9.45002 10.125 10 10.125C10.55 10.125 10.95 10.4 10.95 10.8917C10.95 11.3917 10.55 11.6667 10 11.6667Z'
				fill='currentColor'
			/>
		</Svg>
	);
}
