import { create } from 'axios';

export const api = create({
	baseURL: 'https://dummyjson.com/',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});
