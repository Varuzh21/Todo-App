import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FONTS, PALETTE } from '@/shared/config/theme';
import { LogoIcon } from '@/shared/ui/icons';

interface LogoProps extends ComponentProps<View> {
	width?: number;
	height?: number;
}

export function Logo({ width = 77, height = 77, ...props }: LogoProps) {
	return (
		<View style={styles.container} {...props}>
			<LogoIcon width={width} height={height} />
			<Text style={styles.title}>ToDo</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 14,
	},
	title: {
		fontFamily: FONTS.galanoSemiBold,
		fontSize: 20,
		color: PALETTE.primary,
	},
});
