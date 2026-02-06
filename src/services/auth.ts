import { api } from './axios';

class Auth {
	static login(form: { username: string; password: string }) {
		return api.post('auth/login', form);
	}

	static getUser () {
		return api.get('auth/me')
	}
}

export default Auth;
