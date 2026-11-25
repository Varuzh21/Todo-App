import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';
import { Button } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';

export function WelcomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.body}>
					<View style={styles.intro}>
						<Logo />
						<Text style={styles.description}>
							Welcome to a whole new world of scheduling made easier
						</Text>
					</View>
					<View style={styles.pagination}>
						{Array.from({ length: 3 }, (_, index) => index).map(index => (
							<View
								key={index}
								style={[styles.dot, index === 0 && styles.activeDot]}
							/>
						))}
					</View>
				</View>
				<Button label='Get Started' onPress={() => router.push('/sign-in')} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 52,
		backgroundColor: COLORS.background,
	},
	content: {
		gap: 100,
	},
	body: {
		gap: 68,
	},
	intro: {
		gap: 45,
	},
	description: {
		fontFamily: FONTS.galanoMedium,
		fontSize: 18,
		lineHeight: 20,
		textAlign: 'center',
		color: COLORS.text,
	},
	pagination: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 20,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: PALETTE.gray,
	},
	activeDot: {
		backgroundColor: PALETTE.primary,
	},
});
