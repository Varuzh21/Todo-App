import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Profile, userQueries } from '@/entities/user';
import { toDateKey } from '@/shared/lib/date';

import { saveProfile } from '../api/save-profile';
import type { EditProfileValues } from '../schema/edit-profile.schema';

type SaveProfileVariables = {
	userId: number;
	values: EditProfileValues;
	imageUrl: Profile['imageUrl'];
};

export function useSaveProfile() {
	const queryClient = useQueryClient();

	const saveProfileMutation = useMutation({
		mutationFn: ({ userId, values, imageUrl }: SaveProfileVariables) =>
			saveProfile({
				userId,
				profile: {
					...values,
					birthDate: toDateKey(values.birthDate),
					imageUrl,
				},
			}),
		networkMode: 'always',
		onSuccess: (profile, { userId }) => {
			queryClient.setQueryData(userQueries.profile(userId).queryKey, profile);
		},
		onError: error => {
			if (__DEV__) {
				console.warn('Save profile failed', error.message);
			}
		},
	});

	return {
		saveProfile: saveProfileMutation.mutate,
		isPending: saveProfileMutation.isPending,
		isError: saveProfileMutation.isError,
	};
}
