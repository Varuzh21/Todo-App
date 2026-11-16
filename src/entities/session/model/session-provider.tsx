import { createContext, type PropsWithChildren, useState } from 'react';

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

	async function signIn(tokens: AuthTokens) {
		await saveTokens(tokens);
		setIsSignedIn(true);
	}

	async function signOut() {
		await clearTokens();
		queryClient.clear();
		setIsSignedIn(false);
	}

	const value: SessionContextValue = { isSignedIn, signIn, signOut };

	return <SessionContext value={value}>{children}</SessionContext>;
}
