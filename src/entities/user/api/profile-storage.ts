import AsyncStorage from '@react-native-async-storage/async-storage';

import { type Profile, profileSchema } from '../model/profile-schema';

function getProfileKey(userId: number) {
	return `profile.user-${userId}`;
}

export async function readStoredProfile(userId: number) {
	const storedProfile = await AsyncStorage.getItem(getProfileKey(userId));

	if (storedProfile === null) {
		return null;
	}

	const parsedProfile: unknown = JSON.parse(storedProfile);

	return profileSchema.parse(parsedProfile);
}

export function writeProfile(userId: number, profile: Profile) {
	return AsyncStorage.setItem(getProfileKey(userId), JSON.stringify(profile));
}
