import Auth from '@/services/auth';
import { storage } from '@/services/storage';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { LoginInput, LoginSchema } from '../schemas/auth.schema';

interface User {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	image: string;
}

interface AuthStoreProps {
	signIn: (from: { username: string; password: string }) => Promise<void>;
	user: User | null;
	userToken: string | null;
	isLoading: boolean;
	signOut: () => void;
}

const AuthStore = createContext<AuthStoreProps>({
	signIn: async () => {},
	userToken: null,
	isLoading: true,
	signOut: () => {},
	user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userToken, setUserToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(() => {
			try {
				const token = storage.getString('token');
				if (token) {
					setUserToken(token);
					getUser();
				}
			} catch (e) {
				console.log(`error ${e}`);
				setIsLoading(false);
			}
		})();
	}, []);

	const getUser = useCallback(async () => {
		try {
			const { data } = await Auth.getUser();

			setUser(data);
		} catch (e) {
			console.log(`error ${e}`);
			signOut();
		}
	}, []);

	const signOut = useCallback(() => {
		storage.remove('token');
		setUserToken(null);
		setUser(null);
	}, []);

	const signIn = useCallback(async (form: LoginInput) => {
		try {
			const validateFrom = LoginSchema.parse(form);

			const { data } = await Auth.login(validateFrom);

			storage.set('token', data.accessToken);
			setUserToken(data.accessToken);

			await getUser();

			return data;
		} catch (e) {
			throw new Error(`error ${e}`);
		}
	}, []);

	return (
		<AuthStore.Provider value={{ signIn, userToken, isLoading, user, signOut }}>
			{children}
		</AuthStore.Provider>
	);
}

export const useAuth = () => useContext(AuthStore);
