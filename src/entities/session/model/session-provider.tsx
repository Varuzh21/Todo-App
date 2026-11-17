import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';

import {
	type AuthTokens,
	clearTokens,
	getAccessTokenSync,
	queryClient,
	saveTokens,
} from '@/shared/api';

type SessionContextValue = {
	isSignedIn: boolean;
	signIn: (tokens: AuthTokens) => Promise<void>;
	signOut: () => Promise<void>;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
	const [isSignedIn, setIsSignedIn] = useState(
		() => getAccessTokenSync() !== null,
	);

	const signIn = useCallback(async (tokens: AuthTokens) => {
		await saveTokens(tokens);
		setIsSignedIn(true);
	}, []);

	const signOut = useCallback(async () => {
		await clearTokens();
		queryClient.clear();
		setIsSignedIn(false);
	}, []);

	const value = useMemo<SessionContextValue>(
		() => ({ isSignedIn, signIn, signOut }),
		[isSignedIn, signIn, signOut],
	);

	return <SessionContext value={value}>{children}</SessionContext>;
}
