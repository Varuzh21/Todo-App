import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';

import {
	type AuthTokens,
	clearTokens,
	clearUserId,
	getAccessTokenSync,
	getUserIdSync,
	queryClient,
	saveTokens,
	saveUserId,
} from '@/shared/api';

export type SignInPayload = AuthTokens & { userId: number };

type SessionContextValue = {
	isSignedIn: boolean;
	userId: number | null;
	signIn: (payload: SignInPayload) => Promise<void>;
	signOut: () => Promise<void>;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

// Tasks are stored per user, so a session without a saved user id counts as signed out.
function getStoredUserId() {
	return getAccessTokenSync() === null ? null : getUserIdSync();
}

export function SessionProvider({ children }: PropsWithChildren) {
	const [userId, setUserId] = useState(getStoredUserId);
	const isSignedIn = userId !== null;

	const signIn = useCallback(
		async ({ userId: signedInUserId, ...tokens }: SignInPayload) => {
			await saveTokens(tokens);
			await saveUserId(signedInUserId);
			setUserId(signedInUserId);
		},
		[],
	);

	const signOut = useCallback(async () => {
		await clearTokens();
		await clearUserId();
		queryClient.clear();
		setUserId(null);
	}, []);

	const value = useMemo<SessionContextValue>(
		() => ({ isSignedIn, userId, signIn, signOut }),
		[isSignedIn, userId, signIn, signOut],
	);

	return <SessionContext value={value}>{children}</SessionContext>;
}
