import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, PALETTE } from '@/shared/config/theme';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@/shared/ui/icons';

import type { TaskSummary } from '../model/use-task-summary';
import { TaskStats } from './task-stats';
import { TodayProgress } from './today-progress';

interface DashboardOverviewProps {
	summary: TaskSummary;
	onAddTask: () => void;
}

export function DashboardOverview({
	summary,
	onAddTask,
}: DashboardOverviewProps) {
	return (
		<View style={styles.container}>
			<TodayProgress
				completedCount={summary.todayCompletedCount}
				totalCount={summary.todayTasks.length}
			/>
			<TaskStats summary={summary} />
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Today's Tasks</Text>
				<Button
					label='Add Task'
					icon={<PlusIcon width={16} height={16} color={PALETTE.white} />}
					onPress={onAddTask}
					style={styles.addTaskButton}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 24,
		paddingBottom: 16,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sectionTitle: {
		fontFamily: FONTS.galanoMedium,
		fontSize: 15,
		color: COLORS.text,
	},
	addTaskButton: {
		width: 'auto',
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 6,
	},
});
