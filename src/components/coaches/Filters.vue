<template>
	<base-card>
		<h2>Find Your Coach</h2>
		<span class="filter-options">
			<!-- listening to changes in value (checked == false) with @change  -->
			<input type="checkbox" id="frontend" checked @change="setFilter" />
			<label for="frontend">Frontend</label>
		</span>
		<span class="filter-options">
			<input type="checkbox" id="backend" checked @change="setFilter" />
			<label for="backend">Backend</label>
		</span>
		<span class="filter-options">
			<input type="checkbox" id="career" checked @change="setFilter" />
			<label for="career">Career</label>
		</span>
	</base-card>
</template>

<script>
export default {
	data() {
		return {
			filters: {
				frontend: true,
				backend: true,
				career: true,
			},
		};
	},
	methods: {
		// by default has the event because of binding to input
		setFilter(event) {
			const filterId = event.target.id;
			const isActive = event.target.checked;
			const newFilters = {
				...this.filters,
				[filterId]: isActive,
			};
			this.filters = newFilters;
			this.$emit("update-filters", newFilters);
		},
	},
	emits: ["update-filters"],
};
</script>

<style scoped>
h2 {
	margin: 0.5rem 0;
}

.filter-option {
	margin-right: 1rem;
}

.filter-option label,
.filter-option input {
	vertical-align: middle;
}

.filter-option label {
	margin-left: 0.25rem;
}

.filter-option.active label {
	font-weight: bold;
}
</style>
