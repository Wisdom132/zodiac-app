<template>
  <section class="d-flex">
    <v-card class="mx-auto w-100 bg-grey-2 mt-5" :height="height" :width="width">
      <v-card-text>
        <div>Word of the Day</div>
        <p class="display-1 text--primary">be•nev•o•lent</p>
      </v-card-text>
    </v-card>

    <div class="map-sidebar elevation-3 d-flex h-100">
      <div class="tabs brl br-grey-4 pa-5">
        <div>
          <label class="overline">Customize your design</label>
          <v-container>
            <v-row>
              <v-col>
                <v-select :items="items" label="Change Size" solo></v-select>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>

      <div class="zodiac-sidebar-tools brl br-grey-3">
        <sidebar />
      </div>
    </div>
  </section>
</template>

<script>
import sidebar from "./sidebar";
export default {
  data() {
    return {
      active: true,
      height: 300,
      width: 300,
      items: ["Foo", "Bar", "Fizz", "Buzz"]
    };
  },
  components: {
    sidebar
  }
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
.zodiac-sidebar-tools {
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
  .zodiac-sidebar-tools {
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
