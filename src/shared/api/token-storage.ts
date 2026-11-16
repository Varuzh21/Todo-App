import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';

const ACCESS_TOKEN_KEY = 'auth.access-token';
const REFRESH_TOKEN_KEY = 'auth.refresh-token';

export const authTokensSchema = z.object({
	accessToken: z.jwt(),
	refreshToken: z.jwt(),
});

export type AuthTokens = z.infer<typeof authTokensSchema>;

export function getAccessToken() {
	return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export function getAccessTokenSync() {
	return SecureStore.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
	return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function saveTokens(tokens: AuthTokens) {
	await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
	await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export async function clearTokens() {
	await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
	await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
