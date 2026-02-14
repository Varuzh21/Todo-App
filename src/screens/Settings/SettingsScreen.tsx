import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/hooks/useAuth';

import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button';
import { GradientView } from '@/components/GradientView';

function SettingsScreen() {
	const { signOut } = useAuth();
	return (
		<GradientView>
			<View style={styles.container}>
				<View style={styles.menuWrapper}>
					<AccountButton title='Profile' variant='profile' />
					<AccountButton title='Conversations' variant='conversations' />
					<AccountButton title='Projects' variant='projects' />
					<AccountButton title='Terms and Policies' variant='terms' />
				</View>
				<View style={styles.footer}>
					<Button variant='logout' title='logout' onClick={signOut} />
				</View>
			</View>
		</GradientView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		rowGap: 95,
	},
	menuWrapper: {
		flexDirection: 'column',
	},
	footer: {
		width: '100%',
		alignItems: 'center',
	},
});

export default SettingsScreen;
