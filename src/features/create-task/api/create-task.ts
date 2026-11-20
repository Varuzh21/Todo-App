import { taskSchema } from '@/entities/task';
import { api } from '@/shared/api';

type CreateTaskInput = {
	title: string;
	userId: number;
};

export async function createTask({ title, userId }: CreateTaskInput) {
	const { data } = await api.post('/todos/add', {
		todo: title,
		completed: false,
		userId,
	});

	return taskSchema.parse(data);
}
