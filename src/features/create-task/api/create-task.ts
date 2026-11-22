import { readTasks, type Task, writeTasks } from '@/entities/task';

type CreateTaskInput = Pick<Task, 'title' | 'dueDate' | 'userId'>;

const ID_RADIX = 36;
const RANDOM_ID_LENGTH = 8;

function createTaskId() {
	const timePart = Date.now().toString(ID_RADIX);
	const randomPart = Math.random()
		.toString(ID_RADIX)
		.slice(2, 2 + RANDOM_ID_LENGTH);

	return `${timePart}-${randomPart}`;
}

export async function createTask(input: CreateTaskInput) {
	const task: Task = {
		...input,
		id: createTaskId(),
		isCompleted: false,
		createdAt: new Date().toISOString(),
	};
	const tasks = await readTasks(input.userId);

	await writeTasks(input.userId, [task, ...tasks]);

	return task;
}
