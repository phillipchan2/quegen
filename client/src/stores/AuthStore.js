import { observable, action, computed } from 'mobx';
import axios from 'axios';

class AuthStore {
	@observable
	isAuthenticated = false;

	@observable
	currentUser = {};

	@computed
	get authenticationStatus() {
		return this.isAuthenticated;
	}

	@action.bound
	logout() {
		localStorage.removeItem('jwtoken');
		this.isAuthenticated = false;
		this.currentUser = {};
	}

	@action.bound
	login(user, token) {
		(this.isAuthenticated = true), (this.currentUser = user);

		localStorage.setItem('jwtoken', token);
	}

	@action
	verifyToken() {
		const jwtoken = localStorage.getItem('jwtoken');

		if (jwtoken) {
			axios
				.get(`/api/auth/verify`, {
					headers: {
						token: jwtoken
					}
				})
				.then(res => {
					console.log(res);

					if (res.data.success) {
						this.login(res.data.user, jwtoken);
					}
				});
		}
	}
}

export default AuthStore;
