<template>
	<div>
		<button v-if="!link" :class="mode">
			<slot></slot>
		</button>
		<!-- if link prop is true render router link button -->
		<router-link v-else :to="to" :class="mode">
			<slot></slot>
		</router-link>
	</div>
</template>

<script>
export default {
	props: {
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: String,
			required: false,
			default: "/",
		},
		mode: {
			type: String,
			required: false,
			default: null,
		},
	},
};
</script>

<style scoped>
button,
a {
	text-decoration: none;
	padding: 0.75rem 1.5rem;
	font: inherit;
	background-color: blue;
	border: none;
	color: white;
	cursor: pointer;
	border-radius: 30px;
	margin-right: 0.5rem;
	display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
	background-color: darkblue;
	color: #fff;
}

.flat {
	background-color: transparent;
	color: #3a0061;
	border: none;
}

.outline {
	background-color: transparent;
	border-color: blue;
	color: #000;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
	background-color: #c8c8ff;
	color: #fff;
}
</style>
