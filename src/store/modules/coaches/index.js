import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
	namespaced: true,
	state() {
		return {
			coaches: [],
			lastFetch: null, // setting up state for caching
		};
	},
	mutations,
	getters,
	actions,
};
