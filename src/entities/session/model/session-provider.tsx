import { createContext, type PropsWithChildren, useState } from 'react';

type SessionContextValue = {
	token: string | null;
	isSignedIn: boolean;
	signIn: (token: string) => void;
	signOut: () => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
	const [token, setToken] = useState<string | null>(null);

	const value: SessionContextValue = {
		token,
		isSignedIn: token !== null,
		signIn: setToken,
		signOut: () => setToken(null),
	};

	return <SessionContext value={value}>{children}</SessionContext>;
}
