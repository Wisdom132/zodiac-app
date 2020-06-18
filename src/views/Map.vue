<template>
  <div class="map d-flex">
    <map-view />
    <map-sidebar />
  </div>
</template>

<script>
// Compotents
import Sidebar from "@/components/Map/Sidebar";
import MapView from "@/components/Map/MapView";

// Expoting component
export default {
  name: "Map",
  components: {
    "map-sidebar": Sidebar,
    "map-view": MapView
  }
};
</script>
<style lang="scss" scoped>
.map {
  position: relative;
  height: calc(100% - 4rem) !important;
}
@media screen and (max-width: 845px) {
  .map {
    display: unset !important;
  }
}
</style>