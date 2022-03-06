export default {
	async contactCoach(context, payload) {
		const newRequest = {
			date: new Date().toISOString(),
			userEmail: payload.email,
			message: payload.message,
		};

		const response = await fetch(
			`https://vue-coach-app-903b7-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newRequest),
			}
		);
		const data = await response.json();
		if (!response.ok) {
			const error = new Error(data.message || "Request failed.");
			throw error;
		}

		//Firebase provides an id for each request stored under data.name
		newRequest.id = data.name;
		newRequest.coachId = payload.coachId;

		context.commit("addRequest", newRequest);
	},
	async fetchRequestsFromFirebase(context) {
		const coachId = context.rootGetters.userId;
		const token = context.rootGetters.userSessionToken;
		const response = await fetch(
			`https://vue-coach-app-903b7-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
				token
		);
		const data = await response.json();
		if (!response.ok) {
			const error = new Error(data.message || "GET Request failed.");
			throw error;
		}
		const requests = [];
		for (const obj in data) {
			const request = {
				id: obj,
				coachId: coachId,
				userEmail: data[obj].userEmail,
				message: data[obj].message,
				date: data[obj].date,
			};
			// console.log(request);
			requests.push(request);
		}
		context.commit("showRequests", requests);
	},
};
