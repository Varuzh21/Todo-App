import type { Href } from 'expo-router';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

interface TaskStatCardProps {
	label: string;
	count: number;
	color: string;
	href: Href;
}

export function TaskStatCard({ label, count, color, href }: TaskStatCardProps) {
	const taskWord = count === 1 ? 'task' : 'tasks';

	function openTasks() {
		router.navigate(href);
	}

	return (
		<Pressable
			role='button'
			accessibilityLabel={`${label}, ${count} ${taskWord}`}
			android_disableSound
			onPress={openTasks}
			style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
		>
			<Text style={[styles.count, { color }]}>{count}</Text>
			<Text style={styles.label}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		gap: 4,
		padding: 16,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: PALETTE.grayLight,
		backgroundColor: PALETTE.white,
	},
	cardPressed: {
		opacity: 0.7,
	},
	count: {
		fontFamily: FONTS.galanoSemiBold,
		fontSize: 26,
	},
	label: {
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.textSecondary,
	},
});
