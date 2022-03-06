export default {
	addRequest(state, payload) {
		state.requests.push(payload);
	},
	showRequests(state, payload) {
		state.requests = payload;
	},
};
