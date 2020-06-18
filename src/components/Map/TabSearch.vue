<template>
	<div class="search-tab ta-c">
		<div class="search-form">
			<p>Search location</p>
			<v-text-field dense label="Location" placeholder="Enter a city here..." outlined />
			<p class="caption ta-l">
				<strong>Tip:</strong> Search for a city or a place. Drag the map and zoom in or out.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "tab-search"
}
</script>