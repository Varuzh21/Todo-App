import { queryOptions } from '@tanstack/react-query';

import { getMe } from './get-me';

export const userQueries = {
	all: () => ['user'] as const,
	me: () =>
		queryOptions({
			queryKey: [...userQueries.all(), 'me'],
			queryFn: ({ signal }) => getMe(signal),
		}),
};
