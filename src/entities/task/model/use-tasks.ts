import { useQuery } from '@tanstack/react-query';

import { taskQueries } from '../api/task-queries';

export function useTasks(userId: number) {
	return useQuery(taskQueries.list(userId));
}
