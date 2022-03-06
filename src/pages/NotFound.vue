<template>
	<div>
		<base-card>
			<h2>Page not found</h2>
			<p>
				Page not found. Try visiting the
				<router-link to="/coaches">Coaches</router-link> page.
			</p>
		</base-card>
	</div>
</template>

<script>
import BaseCard from "../components/UI/BaseCard.vue";
export default {
	components: { BaseCard },
};
</script>

<style></style>
