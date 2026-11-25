import { StyleSheet, View } from 'react-native';

import { PALETTE } from '@/shared/config/theme';

import type { TaskSummary } from '../model/use-task-summary';
import { TaskStatCard } from './task-stat-card';

interface TaskStatsProps {
	summary: TaskSummary;
}

export function TaskStats({ summary }: TaskStatsProps) {
	return (
		<View style={styles.grid}>
			<View style={styles.row}>
				<TaskStatCard
					label='Behind Schedule'
					count={summary.behindScheduleCount}
					color={PALETTE.danger}
					href='/task'
				/>
				<TaskStatCard
					label='Today'
					count={summary.todayTasks.length}
					color={PALETTE.primary}
					href='/calendar'
				/>
			</View>
			<View style={styles.row}>
				<TaskStatCard
					label='Upcoming'
					count={summary.upcomingCount}
					color={PALETTE.neutral}
					href='/task/upcoming'
				/>
				<TaskStatCard
					label='Completed'
					count={summary.completedCount}
					color={PALETTE.success}
					href='/task/completed'
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	grid: {
		gap: 12,
	},
	row: {
		flexDirection: 'row',
		gap: 12,
	},
});
