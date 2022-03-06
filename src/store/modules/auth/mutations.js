export default {
	setUser(state, payload) {
		state.token = payload.token;
		state.userId = payload.userId;
	},
	logoutConfirmed(state) {
		state.logoutConfirmed = true;
	},
};
