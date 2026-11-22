import { useSession } from './use-session';

export function useUserId() {
	const { userId } = useSession();

	if (userId === null) {
		throw new Error('useUserId must be used on a signed-in screen');
	}

	return userId;
}
