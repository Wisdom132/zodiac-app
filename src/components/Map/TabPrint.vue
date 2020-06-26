<template>
	<div>
		<label class="overline">Print</label>
		<div class="py-3">
			<v-btn color="primary w-100" @click="printMap">Print</v-btn>
		</div>
	</div>
</template>

<script>
import 
bus from "@/bus"
export default {
  name: "tab-text",
  methods:{
    printMap(){
      bus.$emit('print-map')
    }
  }
}
</script>

<style>
</style>