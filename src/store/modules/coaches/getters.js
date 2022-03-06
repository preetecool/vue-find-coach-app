export default {
	coachesList(state) {
		return state.coaches;
	},
	hasCoaches(state) {
		return state.coaches && state.coaches.length;
	},
	//taking arguments (state + rootState) replacing with _ + _2  but not using them (since they are in order).
	isCoach(_, getters, _2, rootGetters) {
		const coaches = getters.coachesList;
		const userId = rootGetters.userId;
		return coaches.some((coach) => coach.id === userId);
	},
	refreshListOfCoaches(state) {
		const lastFetch = state.lastFetch;
		if (!lastFetch) {
			return true;
		}
		const currentTime = new Date().getTime();
		return (currentTime - lastFetch) / 1000 > 60; // returning true if last refresh was more than 60 seconds ago
	},
};
