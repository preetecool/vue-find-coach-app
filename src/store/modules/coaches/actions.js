export default {
	async registerCoach(context, payload) {
		const userId = context.rootGetters.userId;
		const token = context.rootGetters.userSessionToken;
		const coachData = {
			//id will not be stored on firebase because it is already stored in a node via the fetch link.
			firstName: payload.firstName,
			lastName: payload.lastName,
			description: payload.description,
			hourlyRate: payload.hourlyRate,
			areas: payload.areas,
		};
		//PUT request to Firebase
		const response = await fetch(
			`https://vue-coach-app-903b7-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
				token,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(coachData),
			}
		);
		if (!response.ok) {
			if (!response.ok) {
				const error = new Error("Request Failed.");
				throw error;
			}
		}

		context.commit("registerCoach", {
			...coachData,
			id: userId,
		});
	},
	async fetchCoachesFromFirebase(context, payload) {
		if (!payload.forceFetch && !context.getters.refreshListOfCoaches) {
			return; // If it's been less than 60 seconds, HTTP request will not be sent.
		}
		const response = await fetch(
			`https://vue-coach-app-903b7-default-rtdb.firebaseio.com/coaches.json`
		);
		const data = await response.json();
		if (!response.ok) {
			if (!response.ok) {
				const error = new Error(data.message || "Failed to fetch data.");
				throw error;
			}
		}

		const coaches = [];
		for (const obj in data) {
			const coach = {
				id: obj,
				firstName: data[obj].firstName,
				lastName: data[obj].lastName,
				description: data[obj].description,
				hourlyRate: data[obj].hourlyRate,
				areas: data[obj].areas,
			};
			coaches.push(coach);
		}
		context.commit("showCoaches", coaches);
		context.commit("setFetchTime"); // commiting the lastFetch cache state
	},
};
