import { Fragment, type ReactNode } from 'react';
import {
	ActivityIndicator,
	Pressable,
	type PressableProps,
	StyleSheet,
	Text,
} from 'react-native';

import { FONTS, PALETTE } from '@/shared/config/theme';

interface ButtonProps extends Omit<PressableProps, 'disabled'> {
	label?: string;
	icon?: ReactNode;
	isLoading?: boolean;
}

export function Button({
	label,
	icon,
	isLoading = false,
	style,
	...props
}: ButtonProps) {
	return (
		<Pressable
			accessibilityRole='button'
			accessibilityState={{ disabled: isLoading, busy: isLoading }}
			disabled={isLoading}
			style={state => [
				styles.container,
				typeof style === 'function' ? style(state) : style,
			]}
			{...props}
		>
			{isLoading ? (
				<ActivityIndicator color={PALETTE.white} />
			) : (
				<Fragment>
					{icon}
					{label && <Text style={styles.label}>{label}</Text>}
				</Fragment>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 15,
		borderRadius: 10,
		backgroundColor: PALETTE.primary,
	},
	label: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 16,
		color: PALETTE.white,
	},
});
