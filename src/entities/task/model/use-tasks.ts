import { useQuery } from '@tanstack/react-query';

import { taskQueries } from '@/entities/task/api/task-queries';

export function useTasks() {
	return useQuery(taskQueries.list());
}
