import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SignOutButton } from '@/features/auth';
import { COLORS } from '@/shared/config/theme';
import { Wrapper } from '@/shared/ui/wrapper';

export function MenuScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Todo App</Text>
				<Text style={styles.description}>FSD structure is ready.</Text>
			</View>
			<Wrapper>
				<SignOutButton />
			</Wrapper>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 32,
		lineHeight: 44,
		fontWeight: 600,
		color: COLORS.text,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: 500,
		color: COLORS.textSecondary,
	},
});
