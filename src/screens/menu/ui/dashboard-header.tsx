import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS } from '@/shared/config/theme';
import { Logo } from '@/shared/ui/logo';

import { getGreeting } from '../lib/get-greeting';

interface DashboardHeaderProps {
	firstName: string | null;
}

export function DashboardHeader({ firstName }: DashboardHeaderProps) {
	const greeting = getGreeting(new Date());

	return (
		<View style={styles.header}>
			<Logo width={32} height={32} style={styles.logo} />
			<View style={styles.greeting}>
				<Text style={styles.greetingText}>{greeting}</Text>
				{firstName && <Text style={styles.name}>{firstName}</Text>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	logo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	greeting: {
		alignItems: 'flex-end',
	},
	greetingText: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 13,
		color: COLORS.textSecondary,
	},
	name: {
		fontFamily: FONTS.galanoSemiBold,
		fontSize: 18,
		color: COLORS.text,
	},
});
