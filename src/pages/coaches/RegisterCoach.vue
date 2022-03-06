<template>
	<div>
		<base-card>
			<h2>Register as a Coach</h2>
			<register-form @form-data="registerFormData"></register-form>
		</base-card>
	</div>
</template>

<script>
import RegisterForm from "./RegisterForm.vue";
export default {
	components: {
		RegisterForm,
	},
	methods: {
		registerFormData(data) {
			this.$store.dispatch("coaches/registerCoach", data);
			//replace method = can't go back to form once it's submitted.
			this.$router.replace("/coaches");
		},
	},
};
</script>

<style></style>
