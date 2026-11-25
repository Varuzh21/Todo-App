import type { Task } from './task-schema';

export type TaskStatus = 'behind-schedule' | 'upcoming' | 'completed';

export function isTaskInStatus(
	task: Task,
	status: TaskStatus,
	todayKey: string,
): boolean {
	switch (status) {
		case 'completed':
			return task.isCompleted;
		case 'behind-schedule':
			return !task.isCompleted && task.dueDate < todayKey;
		case 'upcoming':
			return !task.isCompleted && task.dueDate >= todayKey;
		default: {
			const unknownStatus: never = status;
			throw new Error(`Unknown task status: ${unknownStatus}`);
		}
	}
}
