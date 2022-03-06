<template>
	<div>
		<!-- checking for truthy and converting to boolean with double exclamation mark -->
		<base-dialog
			:show="!!error"
			title="An error occured! :("
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>

		<div>
			<filters @update-filters="setFilters"></filters>
		</div>
		<div>
			<base-card>
				<div class="controls">
					<base-button mode="outline" @click="fetchCoaches(true)"
						>Refresh</base-button
					>

					<base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
						>Login to Register as a Coach</base-button
					>
					<base-button
						link
						to="/register"
						v-if="isLoggedIn && !isCoach && !isLoading"
						>Register as a Coach</base-button
					>
				</div>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<ul v-if="hasCoaches">
					<coach-item
						v-for="coach in coaches"
						:key="coach.id"
						:id="coach.id"
						:first-name="coach.firstName"
						:last-name="coach.lastName"
						:rate="coach.hourlyRate"
						:areas="coach.areas"
					>
					</coach-item>
				</ul>
				<h3 v-else>No coahes found.</h3>
			</base-card>
		</div>
	</div>
</template>

<script>
import Filters from "../../components/coaches/Filters.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";

export default {
	components: {
		Filters,
		CoachItem,
	},
	data() {
		return {
			selectedFilters: {
				frontend: true,
				backend: true,
				career: true,
			},
			isLoading: false,
			error: null,
		};
	},
	methods: {
		//listening to the emitted event
		setFilters(newFilters) {
			this.selectedFilters = newFilters;
		},
		async fetchCoaches(refresh = false) {
			try {
				this.isLoading = true;
				await this.$store.dispatch("coaches/fetchCoachesFromFirebase", {
					forceFetch: refresh,
				});
			} catch (error) {
				this.error = error.message || "Something went wrong :(";
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		},
	},
	computed: {
		// reaching out to coaches getters for displaying coach list.
		coaches() {
			// The square brackets are for namespaced modules. ['moduleName/getterName']
			const filteredCoaches = this.$store.getters["coaches/coachesList"];
			//filtering coaches by listening to events from Filters.vue
			return filteredCoaches.filter((coach) => {
				if (this.selectedFilters.frontend && coach.areas.includes("frontend")) {
					return true;
				}
				if (this.selectedFilters.backend && coach.areas.includes("backend")) {
					return true;
				}
				if (this.selectedFilters.career && coach.areas.includes("career")) {
					return true;
				}
				return false;
			});
		},
		hasCoaches() {
			return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
		},

		isCoach() {
			return this.$store.getters["coaches/isCoach"];
		},
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
	},
	created() {
		this.fetchCoaches();
	},
};
</script>

<style scoped>
.controls {
	display: flex;
	justify-content: space-between;
}
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
