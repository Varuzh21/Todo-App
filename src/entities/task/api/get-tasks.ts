import { api } from '@/shared/api';

import { tasksResponseSchema } from '../model/task-schema';

export async function getTasks(signal?: AbortSignal) {
	const { data } = await api.get('/todos', {
		params: { limit: 25 },
		signal,
	});

	return tasksResponseSchema.parse(data).todos;
}
