<template>
	<form @submit="completeCoachRegistration">
		<div class="form-control" :class="{ invalid: !firstName.isValid }">
			<label for="firstname">First Name</label>
			<input
				type="text"
				id="firstname"
				v-model.trim="firstName.value"
				@blur="userFixedErrors('firstName')"
			/>
			<p v-if="!firstName.isValid">First name cannot be empty.</p>
		</div>
		<div class="form-control" :class="{ invalid: !lastName.isValid }">
			<label for="lastname">Last Name</label>
			<input
				type="text"
				id="lastname"
				v-model.trim="lastName.value"
				@blur="userFixedErrors('lastName')"
			/>
			<p v-if="!lastName.isValid">Last name cannot be empty.</p>
		</div>
		<div class="form-control" :class="{ invalid: !description.isValid }">
			<label for="description">Description</label>
			<textarea
				id="description"
				rows="4"
				v-model.trim="description.value"
				@blur="userFixedErrors('description')"
			></textarea>
			<p v-if="!description.isValid">Description cannot be empty.</p>
		</div>
		<div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
			<label for="rate">Hourly Rate</label>
			<input
				type="text"
				id="rate"
				v-model.number="hourlyRate.value"
				@blur="userFixedErrors('hourlyRate')"
			/>
			<p v-if="!hourlyRate.isValid">Hourly rate must be greater than 0.</p>
		</div>
		<div class="form-control" :class="{ invalid: !areas.isValid }">
			<h3>Areas of Expertise</h3>
			<div>
				<input
					type="checkbox"
					id="frontend"
					value="frontend"
					v-model="areas.value"
					@blur="userFixedErrors('areas')"
				/>
				<label for="frontend">Frontend Development</label>
			</div>

			<div>
				<input
					type="checkbox"
					id="backend"
					value="backend"
					v-model="areas.value"
					@blur="userFixedErrors('areas')"
				/>
				<label for="backend">Backend Development</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="career"
					value="career"
					v-model="areas.value"
					@blur="userFixedErrors('areas')"
				/>
				<label for="career">Career Coaching</label>
			</div>
			<p v-if="!firstName.isValid">Please select at least one option.</p>
		</div>
		<p>Please check the form and try again.</p>
		<base-button>Register</base-button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			firstName: {
				value: "",
				isValid: true,
			},
			lastName: {
				value: "",
				isValid: true,
			},
			description: {
				value: "",
				isValid: true,
			},
			hourlyRate: {
				value: null,
				isValid: true,
			},
			areas: {
				value: [],
				isValid: true,
			},
			isFormValid: true,
		};
	},
	methods: {
		userFixedErrors(input) {
			this[input].isValid = true;
		},
		validate() {
			this.isFormValid = true;
			if (this.firstName.value === "") {
				this.firstName.isValid = false;
				this.isFormValid = false;
			}
			if (this.lastName.value === "") {
				this.lastName.isValid = false;
				this.isFormValid = false;
			}
			if (this.description.value === "") {
				this.description.isValid = false;
				this.isFormValid = false;
			}
			if (!this.hourlyRate.value || this.hourlyRate.value < 0) {
				this.hourlyRate.isValid = false;
				this.isFormValid = false;
			}
			if (!this.areas.value.length) {
				this.areas.isValid = false;
				this.isFormValid = false;
			}
		},
		completeCoachRegistration() {
			this.validate();
			if (!this.isFormValid) return;
			const formData = {
				firstName: this.firstName.value,
				lastName: this.lastName.value,
				description: this.description.value,
				hourlyRate: this.hourlyRate.value,
				areas: this.areas.value,
			};
			this.$emit("form-data", formData);
		},
	},
	emits: ["form-data"],
};
</script>

<style scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
}

input:focus,
textarea:focus {
	background-color: #f0e6fd;
	outline: none;
	border-color: #3d008d;
}

input[type="checkbox"] {
	display: inline;
	width: auto;
	border: none;
}

input[type="checkbox"]:focus {
	outline: #3d008d solid 1px;
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid label {
	color: red;
}

.invalid input,
.invalid textarea {
	border: 1px solid red;
}
</style>
