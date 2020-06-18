<template>
	<div class="ta-c">
		<label class="overline">Styles will go here</label>
		<figure class="pencil" @click="setMapColor('pencil')"></figure>
		<figure class="blue" @click="setMapColor('blue')"></figure>
		<figure class="roy" @click="setMapColor('roy')"></figure>
	</div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
	name: "tab-style",
	methods:{
		...mapMutations('map',["SET_MAP_COLOR"]),
		setMapColor(color){
			this.SET_MAP_COLOR(color)
		}
	}
}
</script>

<style scoped>
figure{
	display: inline-block;
	width: 60px;
	height: 60px;
	border-radius: 99em;
	overflow: hidden;
	border: 4px solid rgba(76,89,106,.3);
	background-position: center 90%;
	background-size: 120% auto;
	margin: 0;
	text-align: center;
	line-height: 60px;
	color: rgba(76,89,106,.5);
	margin: 0 auto;
}

figure.pencil{
	background-image: url('../../assets/images/pencil-map.jpg');
}
figure.blue{
	background-image: url('../../assets/images/blue-map.jpg');
}
figure.roy{
	background-image: url('../../assets/images/roy-map.jpg');
}
</style>