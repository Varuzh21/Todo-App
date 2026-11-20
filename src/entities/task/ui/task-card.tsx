import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';

import type { Task } from '../model/task-schema';

interface TaskCardProps extends Pick<Task, 'title' | 'isCompleted'> {}

export const TaskCard = memo(function TaskCard({
	title,
	isCompleted,
}: TaskCardProps) {
	return (
		<View style={styles.card}>
			<View
				style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
			/>
			<Text style={styles.title}>{title}</Text>
		</View>
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
});
