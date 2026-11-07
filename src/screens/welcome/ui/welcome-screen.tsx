import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/shared/config/theme';

export function WelcomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Welcome</Text>
			<Link href='/sign-in'>
				<Text style={styles.link}>Go to sign in</Text>
			</Link>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.background,
	},
	title: {
		fontSize: 32,
		lineHeight: 44,
		fontWeight: 600,
		color: COLORS.text,
	},
	link: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: 500,
		color: COLORS.textSecondary,
	},
});
