<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occured! :("
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<div>
			<base-card>
				<header>Your Coaching Requests</header>
				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="hasRequests && !isLoading">
					<request-item
						v-for="request in coachRequests"
						:key="request.id"
						:email="request.userEmail"
						:message="request.message"
					></request-item>
				</ul>
				<h3 v-else>No requests yet!</h3>
			</base-card>
		</div>
	</div>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";
export default {
	components: {
		RequestItem,
	},
	data() {
		return {
			isLoading: false,
			error: null,
		};
	},
	methods: {
		async fetchRequests() {
			try {
				await this.$store.dispatch("requests/fetchRequestsFromFirebase");
			} catch (error) {
				this.error = error.message || "Unable to load requests :(";
			}
		},
		handleError() {
			this.error = false;
		},
	},
	computed: {
		coachRequests() {
			return this.$store.getters["requests/requests"];
		},
		hasRequests() {
			return this.$store.getters["requests/hasRequests"];
		},
	},
	created() {
		this.fetchRequests();
	},
};
</script>

<style scoped>
header {
	text-align: center;
}

ul {
	list-style: none;
	margin: 2rem auto;
	padding: 0;
	max-width: 30rem;
}

h3 {
	text-align: center;
}
</style>
