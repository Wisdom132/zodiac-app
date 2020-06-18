<template>
	<v-app >
		<app-bar />
		<v-content>
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
// Components
import Header from "./components/layouts/Header"
export default {
	name: 'App',
	components: {
		'app-bar': Header
	}
}
</script>

<style lang="scss">
	// Imports
	@import "./assets/scss/inc/styles";
	@import "./assets/scss/utils/utils";
	@import "./assets/libs/pro.fontawesome.min.css";

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		height: 100vh;
		position: relative;
	}
</style>
