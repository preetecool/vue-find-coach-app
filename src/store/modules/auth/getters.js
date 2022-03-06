export default {
	userId(state) {
		return state.userId;
	},
	userSessionToken(state) {
		return state.token;
	},
	isAuthenticated(state) {
		//If users have a token - they are authenticated
		//converting to true boolean with double exclamation mark.
		return !!state.token;
	},
	isForceLogoutConfirmed(state) {
		return state.forceLogoutConfirmed;
	},
};
