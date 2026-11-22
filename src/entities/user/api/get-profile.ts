import { toProfile } from '../lib/to-profile';
import { getMe } from './get-me';
import { readStoredProfile } from './profile-storage';

// The saved profile wins; the API only fills it in the first time.
export async function getProfile(userId: number, signal?: AbortSignal) {
	const storedProfile = await readStoredProfile(userId);

	if (storedProfile) {
		return storedProfile;
	}

	return toProfile(await getMe(signal));
}
