import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

import { PALETTE } from '@/shared/config/theme';

export function SuccessIcon(props: SvgProps) {
	return (
		<Svg width={72} height={72} viewBox='0 0 72 72' fill='none' {...props}>
			<Circle cx={36} cy={36} r={36} fill={PALETTE.success} />
			<Path
				d='M22 37L31.5 46.5L50 27'
				stroke={PALETTE.white}
				strokeWidth={4}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}
