import { createContext, ReactNode, useCallback, useContext } from 'react';
// import AuthSchema from '../schemas/AuthSchema';
import Auth from '../services/auth';

interface AuthStoreProps {
	signIn: (from: { username: string; password: string }) => Promise<void>;
}

const defaultAuthStore = {
	signIn: async () => {},
};

const AuthStore = createContext<AuthStoreProps>(defaultAuthStore);

export function AuthProvider({ children }: { children: ReactNode }) {
	const signIn = useCallback(
		async (form: { username: string; password: string }) => {
			try {
				// const validateFrom = AuthSchema.parse(form);

				const { data } = await Auth.login(form);

				return data;
			} catch (e) {
				throw new Error(`error ${e}`);
			}
		},
		[],
	);

	return (
		<AuthStore.Provider value={{ signIn }}>
			{children}
		</AuthStore.Provider>
	);
}

export const useAuth = () => useContext(AuthStore);
