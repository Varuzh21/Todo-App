import Auth from '@/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { LoginInput, LoginSchema } from '../schemas/auth.schema';

interface AuthStoreProps {
	signIn: (from: { username: string; password: string }) => Promise<void>;
}

const defaultAuthStore = {
	signIn: async () => {},
};

const AuthStore = createContext<AuthStoreProps>(defaultAuthStore);

export function AuthProvider({ children }: { children: ReactNode }) {
	const signIn = useCallback(async (form: LoginInput) => {
		try {
			const validateFrom = LoginSchema.parse(form);

			const { data } = await Auth.login(validateFrom);

			await AsyncStorage.setItem('token', data.accessToken);

			return data;
		} catch (e) {
			throw new Error(`error ${e}`);
		}
	}, []);

	return <AuthStore.Provider value={{ signIn }}>{children}</AuthStore.Provider>;
}

export const useAuth = () => useContext(AuthStore);
