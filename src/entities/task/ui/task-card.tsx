import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

import type { Task } from '../model/task-schema';

interface TaskCardProps extends Pick<Task, 'title' | 'isCompleted'> {
	onPress?: () => void;
}

export const TaskCard = memo(function TaskCard({
	title,
	isCompleted,
	onPress,
}: TaskCardProps) {
	return (
		<Pressable
			role='checkbox'
			accessibilityLabel={title}
			accessibilityState={{ checked: isCompleted }}
			disabled={!onPress}
			onPress={onPress}
			style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
		>
			<View
				style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
			/>
			<Text style={[styles.title, isCompleted && styles.titleCompleted]}>
				{title}
			</Text>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		paddingHorizontal: 20,
		paddingVertical: 26,
		borderWidth: 1,
		borderColor: PALETTE.grayLight,
		borderRadius: 8,
		backgroundColor: PALETTE.white,
	},
	cardPressed: {
		opacity: 0.7,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: PALETTE.gray,
	},
	checkboxCompleted: {
		borderColor: PALETTE.primary,
		backgroundColor: PALETTE.primary,
	},
	title: {
		flex: 1,
		fontFamily: FONTS.galanoRegular,
		fontSize: 14,
		color: COLORS.text,
	},
	titleCompleted: {
		color: COLORS.textSecondary,
		textDecorationLine: 'line-through',
	},
});
