import { type Profile, writeProfile } from '@/entities/user';

type SaveProfileInput = {
	userId: number;
	profile: Profile;
};

export async function saveProfile({ userId, profile }: SaveProfileInput) {
	await writeProfile(userId, profile);

	return profile;
}
