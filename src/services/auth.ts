import { api } from './axios';

class Auth {
	static login(form: { username: string; password: string }) {
		return api.post('auth/login', form);
	}
}

export default Auth;
