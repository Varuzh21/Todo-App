import { AuthStore } from '@/contexts/AuthStore';
import { useContext } from 'react';

export function useAuth() {
	const auth = useContext(AuthStore);

	if (auth === undefined || null)
		throw new Error('useAuth mot be used with in AuthStore');

	return auth;
}
