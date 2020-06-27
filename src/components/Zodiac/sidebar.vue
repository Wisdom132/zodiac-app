 <template>
  <div :class="active" class="tool ta-c pointer my-5">
    <v-icon>mdi-weather-windy</v-icon>
    <p class="mt-1 mb-0">Zodiac</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true
    };
  },
  name: "tab-zodiac"
};
</script>

<style>
</style>