import { useContext } from 'react';
import { AuthStore } from '@/contexts/AuthStore';

export function useAuth() {
	const auth = useContext(AuthStore);

	if (!auth)
		throw new Error('useAuth mot be used with in AuthStore');

	return auth;
}
