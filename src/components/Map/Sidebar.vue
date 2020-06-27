<template>
  <div class="map-sidebar elevation-3 d-flex h-100">
    <div class="tabs brl br-grey-4 pa-5">
      <component :is="activeComponent" />
    </div>
    <sidebar-tools @change="v=>activeComponent=v" />
  </div>
</template>

<script>
// Components
import SidebarTools from "./SidebarTools";
// Tab Components
import TabSearch from "./TabSearch";
import TabStyle from "./TabStyle";
import TabLayout from "./TabLayout";
import TabText from "./TabText";
import TabPrint from "./TabPrint";

// Exports
export default {
  name: "map-sidebar",
  components: {
    "sidebar-tools": SidebarTools,
    // Tab Components
    "tab-search": TabSearch,
    "tab-style": TabStyle,
    "tab-layout": TabLayout,
    "tab-text": TabText,
    "tab-print": TabPrint
  },
  data: () => ({
    activeComponent: "tab-search"
  })
};
</script>
<style lang="scss" scoped>
.tabs {
  width: 25rem;
  .overline {
    font-size: 0.8em !important;
  }
}
@media screen and (max-width: 845px) {
  .map-sidebar {
    display: unset !important;
    .tabs {
      width: 100%;
      margin-bottom: 4rem;
    }
  }
}
</style>