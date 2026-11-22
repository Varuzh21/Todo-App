import AsyncStorage from '@react-native-async-storage/async-storage';

import { type Task, tasksSchema } from '../model/task-schema';

function getTasksKey(userId: number) {
	return `tasks.user-${userId}`;
}

export async function readTasks(userId: number) {
	const storedTasks = await AsyncStorage.getItem(getTasksKey(userId));

	if (storedTasks === null) {
		return [];
	}

	const parsedTasks = JSON.parse(storedTasks);

	return tasksSchema.parse(parsedTasks);
}

export function writeTasks(userId: number, tasks: Task[]) {
	return AsyncStorage.setItem(getTasksKey(userId), JSON.stringify(tasks));
}

// Every write reads the whole list and saves it back, so task mutations share
// this scope and TanStack runs them one at a time instead of overwriting each other.
export const TASK_STORAGE_MUTATION_SCOPE = { id: 'task-storage' };
