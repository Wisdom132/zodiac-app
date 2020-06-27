<template>
  <div class="map-sidebar-tools brl br-grey-3">
    <template v-for="tool in tools">
      <div
        :key="tool.component"
        :class="tool.active?'active':''"
        @click="handleTabChange(tool.component)"
        class="tool ta-c pointer my-5"
      >
        <i v-if="tool.iconFont=='fa'" :class="tool.icon" class="fa-lg" />
        <v-icon v-else>{{tool.icon}}</v-icon>
        <p class="mt-1 mb-0">{{tool.text}}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebar-tools",
  data: () => ({
    tools: [
      {
        component: "tab-search",
        text: "Search",
        icon: "mdi-magnify",
        active: true,
        iconFont: "mdi"
      },
      {
        component: "tab-style",
        text: "Style",
        icon: "fal fa-paint-brush",
        active: false,
        iconFont: "fa"
      },
      {
        component: "tab-layout",
        text: "Layout",
        icon: "mdi-layers-outline",
        active: false,
        iconFont: "mdi"
      },
      {
        component: "tab-text",
        text: "Text",
        icon: "mdi-format-text",
        active: false,
        iconFont: "mdi"
      },
      {
        component: "tab-zodiac",
        text: "Zodiac",
        icon: "mdi-weather-windy",
        active: false,
        iconFont: "mdi"
      }
    ]
  }),
  methods: {
    handleTabChange(component) {
      this.tools = this.tools.map(tool => {
        return tool.component === component
          ? { ...tool, active: true }
          : { ...tool, active: false };
      });
      this.$emit("change", component);
    }
  }
};
</script>

<style lang="scss" scoped>
.map-sidebar-tools {
  width: 4rem;
  .tool {
    border-left: 2px solid white;
    border-right: 2px solid white;
    p {
      font-size: 0.75em;
    }
    p,
    i {
      color: #212121;
    }
    &.active {
      p,
      i {
        color: rgb(0, 165, 165);
      }
      border-left-color: rgb(0, 165, 165);
    }
  }
}
@media screen and (max-width: 845px) {
  .map-sidebar-tools {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    background-color: white;
    justify-content: center;
    border-left: none;
    border-top: 1px solid #e0e0e0;
    .tool {
      margin: 0 0.8rem !important;
      padding: 0.3rem 0.8rem;
      border-left: none;
      border-right: none;
      border-top: 2px solid white;
      border-bottom: 2px solid white;
      &.active {
        border-top-color: rgb(0, 165, 165);
      }
    }
  }
}
</style>