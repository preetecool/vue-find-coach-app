let timer;

export default {
	async signup(context, payload) {
		return context.dispatch("authenticateUser", {
			...payload,
			mode: "signup",
		});
	},
	async login(context, payload) {
		return context.dispatch("authenticateUser", {
			...payload,
			mode: "login",
		});
	},
	async authenticateUser(context, payload) {
		const mode = payload.mode;
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd4EXTXon92k4k2ESylIupWs0YE0btH8Y";

		if (mode === "signup") {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd4EXTXon92k4k2ESylIupWs0YE0btH8Y`;
		}

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			}),
		});
		const data = await response.json();
		if (!response.ok) {
			const error = new Error(data.message || "Failed to login.");
			throw error;
		}
		//.expiresIn is data provided by Firebase

		const tokenExpiresIn = +data.expiresIn * 1000; //converting .expiresIn string to a number with +
		const tokenExpirationDate = new Date().getTime() + tokenExpiresIn;

		localStorage.setItem("token", data.idToken);
		localStorage.setItem("userId", data.localId);
		localStorage.setItem("tokenExpiration", tokenExpirationDate);

		timer = setTimeout(() => {
			context.dispatch("forceLogoutConfirmed");
		}, tokenExpiresIn);

		context.commit("setUser", {
			token: data.idToken,
			userId: data.localId,
		});
	},
	tryLogin(context) {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		const tokenExpiration = localStorage.getItem("tokenExpiration");

		const tokenExpiresIn = +tokenExpiration - new Date().getTime();
		if (tokenExpiresIn < 0) return;

		timer = setTimeout(() => {
			context.dispatch("forceLogoutConfirmed");
		}, tokenExpiresIn);

		if (token && userId) {
			context.commit("setUser", {
				token: token,
				userId: userId,
			});
		}
	},
	logout(context) {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		localStorage.removeItem("tokenExpiration");

		clearTimeout(timer);

		context.commit("setUser", {
			token: null,
			userId: null,
		});
	},
	forceLogout(context) {
		context.dispatch("logout");
		context.commit("forceLogoutConfirmed");
	},
};
