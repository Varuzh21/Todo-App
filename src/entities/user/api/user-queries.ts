import { queryOptions } from '@tanstack/react-query';

import { getMe } from './get-me';
import { getProfile } from './get-profile';

export const userQueries = {
	all: () => ['user'] as const,
	me: () =>
		queryOptions({
			queryKey: [...userQueries.all(), 'me'],
			queryFn: ({ signal }) => getMe(signal),
		}),
	profile: (userId: number) =>
		queryOptions({
			queryKey: [...userQueries.all(), 'profile', userId],
			queryFn: ({ signal }) => getProfile(userId, signal),
			// A saved profile needs no network; only the first load calls the API.
			networkMode: 'offlineFirst',
		}),
};
