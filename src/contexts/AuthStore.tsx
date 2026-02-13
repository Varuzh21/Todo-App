import { LoginInput, LoginSchema } from '@/schemas/auth.schema';
import { storage } from '@/services/storage';
import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import Api from '@/services/auth';

interface User {
	id: number;
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

export const AuthStore = createContext<AuthStoreProps>({
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
			setIsLoading(true);
			try {
				const token = storage.getString('token');
				if (token) {
					setUserToken(token);
					getUser();
				}
				setIsLoading(false);
			} catch (e) {
				console.log(`error ${e}`);
				setIsLoading(false);
			}
		})();
	}, []);

	const getUser = useCallback(async () => {
		try {
			const { data } = await Api.getUser();

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
		setIsLoading(true);
		try {
			const validateFrom = LoginSchema.parse(form);

			const { data } = await Api.login(validateFrom);

			storage.set('token', data.accessToken);
			setUserToken(data.accessToken);

			await getUser();

			setIsLoading(false);
			return data;
		} catch (e) {
			setIsLoading(false);
			throw new Error(`error ${e}`);
		}
	}, []);

	const value = useMemo(
		() => ({
			userToken,
			isLoading,
			user,
			getUser,
			signIn,
			signOut,
		}),
		[userToken, isLoading, user, getUser, signIn, signOut],
	);

	return (
		<AuthStore.Provider value={value}>
			{children}
		</AuthStore.Provider>
	);
}
