import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

import { PALETTE } from '@/shared/config/theme';

export function LogoIcon(props: SvgProps) {
	return (
		<Svg width={77} height={77} viewBox='0 0 77 77' fill='none' {...props}>
			<Circle cx={38.5} cy={38.5} r={38.5} fill={PALETTE.primary} />
			<Path
				d='M34.0808 48.5691C33.5001 48.5691 32.9484 48.3443 32.5418 47.951L24.3242 39.9996C23.4821 39.1848 23.4821 37.8361 24.3242 37.0213C25.1663 36.2065 26.5601 36.2065 27.4022 37.0213L34.0808 43.4836L49.0062 29.0418C49.8482 28.227 51.242 28.227 52.0841 29.0418C52.9262 29.8566 52.9262 31.2052 52.0841 32.02L35.6198 47.951C35.2133 48.3443 34.6616 48.5691 34.0808 48.5691Z'
				fill={PALETTE.white}
			/>
		</Svg>
	);
}
