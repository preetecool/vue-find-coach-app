export default {
	requests(state, _, _2, rootGetters) {
		const coachId = rootGetters.userId;
		return state.requests.filter((request) => request.coachId === coachId);
	},
	hasRequests(_, getters) {
		//checking getters requests(previous getter on this file)
		return getters.requests && getters.requests.length > 0;
	},
};
