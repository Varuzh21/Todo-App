import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { isTaskInStatus, type Task, taskQueries } from '@/entities/task';
import { toDateKey } from '@/shared/lib/date';

export type TaskSummary = {
	behindScheduleCount: number;
	upcomingCount: number;
	completedCount: number;
	todayTasks: Task[];
	todayCompletedCount: number;
};

function countTasks(tasks: Task[], isMatch: (task: Task) => boolean) {
	return tasks.filter(isMatch).length;
}

export function useTaskSummary(userId: number) {
	const todayKey = toDateKey(new Date());

	const selectSummary = useCallback(
		(tasks: Task[]): TaskSummary => {
			const todayTasks = tasks.filter(task => task.dueDate === todayKey);

			return {
				behindScheduleCount: countTasks(tasks, task =>
					isTaskInStatus(task, 'behind-schedule', todayKey),
				),
				upcomingCount: countTasks(tasks, task =>
					isTaskInStatus(task, 'upcoming', todayKey),
				),
				completedCount: countTasks(tasks, task =>
					isTaskInStatus(task, 'completed', todayKey),
				),
				todayTasks,
				todayCompletedCount: countTasks(todayTasks, task => task.isCompleted),
			};
		},
		[todayKey],
	);

	return useQuery({ ...taskQueries.list(userId), select: selectSummary });
}
