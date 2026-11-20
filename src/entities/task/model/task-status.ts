import type { Task } from './task-schema';

export type TaskStatus = 'behind-schedule' | 'upcoming' | 'completed';

export function isTaskInStatus(task: Task, status: TaskStatus) {
	if (status === 'completed') {
		return task.isCompleted;
	}

	if (status === 'upcoming') {
		return !task.isCompleted;
	}

	// Behind schedule needs a due date, which the API doesn't provide yet.
	return false;
}
