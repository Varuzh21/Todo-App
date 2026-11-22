import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { type Task, taskQueries } from '@/entities/task';
import { toDateKey } from '@/shared/lib/date';

type UseCalendarTasksOptions = {
	userId: number;
	selectedDate: Date;
	searchQuery: string;
};

function compareByDueDate(first: Task, second: Task) {
	return first.dueDate.localeCompare(second.dueDate);
}

export function useCalendarTasks({
	userId,
	selectedDate,
	searchQuery,
}: UseCalendarTasksOptions) {
	const selectedDateKey = toDateKey(selectedDate);
	const normalizedQuery = searchQuery.trim().toLowerCase();

	const selectTasks = useCallback(
		(tasks: Task[]) => {
			if (!normalizedQuery) {
				return tasks.filter(task => task.dueDate === selectedDateKey);
			}

			return tasks
				.filter(
					task =>
						task.title.toLowerCase().includes(normalizedQuery) ||
						task.dueDate.includes(normalizedQuery),
				)
				.sort(compareByDueDate);
		},
		[normalizedQuery, selectedDateKey],
	);

	const { data: tasks = [], isPending } = useQuery({
		...taskQueries.list(userId),
		select: selectTasks,
	});

	return { tasks, isPending, isSearching: normalizedQuery.length > 0 };
}
