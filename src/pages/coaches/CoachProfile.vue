<template>
	<div>
		<div>
			<base-card>
				<h2>{{ fullName }}</h2>
				<h3>${{ rate }}/hour</h3>
			</base-card>
		</div>

		<div>
			<base-card>
				<base-badge
					v-for="area in areas"
					:key="area"
					:type="area"
					:title="area"
				></base-badge>
				<p>{{ description }}</p>

				<router-view></router-view>
			</base-card>
		</div>
		<div v-if="$route.path === `/coaches/${this.id}`">
			<base-card>
				<header>
					<h2>Contact Coach</h2>
					<base-button link :to="contactLink">Contact</base-button>
				</header>
				<router-view></router-view>
			</base-card>
		</div>
	</div>
</template>

<script>
export default {
	props: ["id"],
	data() {
		return {
			coach: null,
		};
	},
	//once the instance has finished processing all state-related options.
	created() {
		this.coach = this.$store.getters["coaches/coachesList"].find(
			(coach) => coach.id === this.id
		);
	},
	computed: {
		fullName() {
			return this.coach.firstName + " " + this.coach.lastName;
		},
		rate() {
			return this.coach.hourlyRate;
		},
		contactLink() {
			return "/coaches/" + this.id + "/contact";
		},
		areas() {
			return this.coach.areas;
		},
		description() {
			return this.coach.description;
		},
		coachProfileLink() {
			// return $route.path === `/coaches/${this.id}`;
		},
	},
};
</script>

<style></style>
