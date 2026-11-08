import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { FONTS, PALETTE } from '@/shared/config/theme';

interface ButtonProps extends ComponentProps<Pressable> {
	label?: string;
	isLoading?: boolean;
}

export function Button({ label, ...props }: ButtonProps) {
	return (
		<Pressable style={styles.container} {...props}>
			{label && <Text style={styles.buttonText}>{label}</Text>}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
		borderRadius: 10,
		backgroundColor: PALETTE.primary,
	},
	buttonText: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 16,
		color: PALETTE.white,
	},
});
