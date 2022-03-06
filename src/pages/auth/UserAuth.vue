<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occurred."
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog :show="isLoading" title="Autenticating" fixed>
			<base-spinner></base-spinner>
		</base-dialog>
		<base-card>
			<form @submit.prevent="submitUserInfomation">
				<div class="form-control">
					<label for="email">Email</label>
					<input type="email" id="email" v-model.trim="email" />
				</div>
				<div class="form-control">
					<label for="password">Password</label>
					<input type="password" id="password" v-model.trim="password" />
				</div>
				<p v-if="!formIsValid">
					Please verify your email address or ensure your password has a minumum
					of 6 characters
				</p>
				<base-button>{{ buttonMode }}</base-button>
				<base-button type="button" mode="flat" @click="switchAuthMode">{{
					switchButtonMode
				}}</base-button>
			</form>
		</base-card>
	</div>
</template>

<script>
import BaseSpinner from "../../components/UI/BaseSpinner.vue";
export default {
	components: { BaseSpinner },
	data() {
		return {
			email: "",
			password: "",
			formIsValid: true,
			mode: "login",
			isLoading: false,
			error: null,
		};
	},
	computed: {
		buttonMode() {
			if (this.mode === "login") return "Login";
			else return "Signup";
		},
		switchButtonMode() {
			if (this.mode === "login") return "Singup for a new account";
			else return "Login to your account";
		},
	},
	methods: {
		async submitUserInfomation() {
			this.formIsValid = true;
			if (
				this.email === "" ||
				!this.email.includes("@") ||
				this.password.length < 6
			) {
				this.formIsValid = false;
				return;
			}

			this.isLoading = true;
			const formDataPayload = {
				email: this.email,
				password: this.password,
			};
			try {
				if (this.mode === "login") {
					await this.$store.dispatch("login", formDataPayload);
				} else {
					await this.$store.dispatch("signup", formDataPayload);
				}
				const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
				this.$router.replace(redirectUrl);
			} catch (error) {
				this.error =
					error.message || "Failed to authenticate. Please try again later.";
			}

			this.isLoading = false;
		},
		switchAuthMode() {
			if (this.mode === "login") this.mode = "signup";
			else this.mode = "login";
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>

<style scoped>
form {
	margin: 1rem;
	border-radius: 12px;
	padding: 1rem;
}

.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
}

input {
	display: block;
	width: 100%;
	font: inherit;
	border: 1px solid #ccc;
	padding: 0.15rem;
}

input:focus {
	border-color: #3d008d;
	background-color: #faf6ff;
	outline: none;
}

.errors {
	font-weight: bold;
	color: red;
}

.actions {
	text-align: center;
}
</style>
