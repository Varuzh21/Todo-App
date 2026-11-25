import 'axios';

declare module 'axios' {
	interface AxiosRequestConfig {
		isRetry?: boolean;
	}
}
