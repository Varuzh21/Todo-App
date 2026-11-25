import { create, type InternalAxiosRequestConfig, isAxiosError } from 'axios';
import {
	authTokensSchema,
	clearTokens,
	getAccessToken,
	getRefreshToken,
	saveTokens,
} from '@/shared/api/token-storage';

export const api = create({
	baseURL: 'https://dummyjson.com/',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
	const accessToken = await getAccessToken();

	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
});

api.interceptors.response.use(
	response => response,
	async (error: unknown) => {
		if (!isAxiosError(error) || error.response?.status !== 401) {
			throw error;
		}

		const originalRequest = error.config;

		if (!originalRequest || originalRequest.isRetry) {
			throw error;
		}

		const refreshToken = await getRefreshToken();

		if (!refreshToken) {
			throw error;
		}

		try {
			const { data } = await api.post(
				'/auth/refresh',
				{ refreshToken },
				{ isRetry: true },
			);

			await saveTokens(authTokensSchema.parse(data));
		} catch (refreshError) {
			await clearTokens();
			throw refreshError;
		}

		return api.request({ ...originalRequest, isRetry: true });
	},
);
