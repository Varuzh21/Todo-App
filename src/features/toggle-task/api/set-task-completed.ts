import { readTasks, type Task, writeTasks } from '@/entities/task';

export type SetTaskCompletedInput = Pick<Task, 'userId' | 'isCompleted'> & {
	taskId: Task['id'];
};

export async function setTaskCompleted({
	userId,
	taskId,
	isCompleted,
}: SetTaskCompletedInput) {
	const tasks = await readTasks(userId);
	const updatedTasks = tasks.map(task =>
		task.id === taskId ? { ...task, isCompleted } : task,
	);

	await writeTasks(userId, updatedTasks);
}
