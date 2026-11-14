import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SignInForm } from '@/features/auth';
import { COLORS } from '@/shared/config/theme';
import { Logo } from '@/shared/ui/logo';
import { Wrapper } from '@/shared/ui/wrapper';

export function SignInScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
				<Wrapper>
					<View style={{ paddingTop: 80, gap: 40 }}>
						<Logo
							width={50}
							height={50}
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 10,
							}}
						/>
						<SignInForm />
					</View>
				</Wrapper>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
});
