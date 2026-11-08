import { StyleSheet, Text, View } from 'react-native';

import { Logo as LogoIcon } from '@/shared/assets/icons';
import { FONTS, PALETTE } from '@/shared/config/theme';

export function Logo() {
	return (
		<View style={styles.container}>
			<LogoIcon />
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
