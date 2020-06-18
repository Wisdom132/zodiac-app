<template>
	<div class="tab-layouts">
		<label class="overline">Layouts</label>
		<div class="layouts">
			<div class="d-flex justify-center">
				<v-card class="ma-3 pa-3 pointer active">
					<v-icon class="mdi-48px">mdi-page-layout-footer</v-icon>
				</v-card>
				<v-card class="ma-3 pa-3 pointer">
					<v-icon class="mdi-48px">mdi-page-layout-header</v-icon>
				</v-card>
			</div>
			<div class="d-flex justify-center">
				<v-card class="ma-3 pa-3 pointer">
					<v-icon class="mdi-48px">mdi-page-layout-header-footer</v-icon>
				</v-card>
				<v-card class="ma-3 pa-3 pointer">
					<v-icon class="mdi-48px">mdi-page-layout-sidebar-right</v-icon>
				</v-card>
			</div>
		</div>
		<label class="overline">Text</label>
		<div class="text">
			<div class="d-flex py-2">
				<v-card class="w-100 mr-3 active pointer">
					<v-skeleton-loader class="mb-5" ref="skeleton" boilerplate type="list-item-three-line"></v-skeleton-loader>
					<p class="mb-0">Three line</p>
				</v-card>
				<v-card class="w-100 pointer">
					<v-skeleton-loader class="mb-5" ref="skeleton" boilerplate type="list-item-two-line"></v-skeleton-loader>
					<p class="mb-0">Two line</p>
				</v-card>
			</div>
		</div>
		<label class="overline">Text Align</label>
		<v-btn-toggle v-model="textAlign" class="py-2">
			<v-btn>
				<v-icon>mdi-format-align-left</v-icon>
			</v-btn>
			<v-btn>
				<v-icon>mdi-format-align-center</v-icon>
			</v-btn>
			<v-btn>
				<v-icon>mdi-format-align-right</v-icon>
			</v-btn>
			<v-btn>
				<v-icon>mdi-format-align-justify</v-icon>
			</v-btn>
		</v-btn-toggle>
	</div>
</template>

<script>
export default {
	name: "tab-layout",
	data: () => ({
		textAlign: 'left'
	})
}
</script>

<style lang='scss' scoped>
	.active {
		border: 2px solid #00bcd4;
		background-color: #e0f7fa;
	}

	.text {
		p {
			position: absolute;
			bottom: 0.2rem;
			left: 50%;
			transform: translate(-50%, 0);
			min-width: max-content;
			font-size: 0.75em;
		}
	}
</style>