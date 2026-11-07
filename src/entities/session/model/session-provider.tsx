import { createContext, useState, type PropsWithChildren } from 'react';

type SessionContextValue = {
  token: string | null;
  isSignedIn: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

// The token lives in memory only; persist it (e.g. expo-secure-store) once sign-in is implemented.
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
