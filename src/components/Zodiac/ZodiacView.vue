<template>
  <section class="d-flex">
    <v-container style="background: #f0f4fb;">
      <v-row>
        <v-col>
          <v-card class="mx-auto w-100 bg-grey-2 mt-5" :height="height" :width="width">
            <v-card-text class="text-center">
              <!-- <img :src="cardData.img" alt /> -->
              <p class="display-1 text--primary text-uppercase">{{cardData.name}}</p>
              <v-list-item-title class="headline mb-1 text-uppercase">{{cardData.element}}</v-list-item-title>
              <v-list-item-subtitle class="text-uppercase">{{cardData.tag}}</v-list-item-subtitle>
              <v-list-item-subtitle class="text-uppercase">{{cardData.subline}}</v-list-item-subtitle>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="map-sidebar elevation-3 d-flex h-100">
      <div class="tabs brl br-grey-4 pt-10">
        <div>
          <label class="overline pa-2">Customize your design</label>
          <v-container ma-0 pa-0>
            <v-row>
              <v-col>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Customize style</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-select
                        @change="changeDimensions"
                        item-text="display_name"
                        item-value="value"
                        v-model="model"
                        :items="items"
                        label="Change Size"
                        solo
                      ></v-select>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Customize sign</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Picker in menu"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="getSign(date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>

                      <v-select
                        :items="signs"
                        item-text="name"
                        @change="getbysign(sign)"
                        v-model="sign"
                        item-value="name"
                        label="Zodiac"
                        solo
                      ></v-select>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Customize Text</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-text-field
                        label="Header Line"
                        v-model="cardData.name"
                        placeholder="Placeholder"
                        outlined
                      ></v-text-field>
                      <v-text-field
                        label="Divider"
                        v-model="cardData.element"
                        placeholder="Placeholder"
                        outlined
                      ></v-text-field>
                      <v-text-field
                        label="Tagline"
                        v-model="cardData.tag"
                        placeholder="Placeholder"
                        outlined
                      ></v-text-field>
                      <v-text-field
                        label="Subline"
                        v-model="cardData.subline"
                        placeholder="Placeholder"
                        outlined
                      ></v-text-field>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
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
import { getByDate, getByName } from "./finder.js";
import signs from "./model";
import sidebar from "./sidebar";
export default {
  data() {
    return {
      cardData: {
        // img: require("./images/aries_figure.svg"),
        name: "Aquário",
        element: "Air",
        tag: "PROGRESSIVE • IMAGINATIVE • INDEPENDENT",
        subline: "JAN 20 - FEB 18",
        start: new Date("2017/01/21"),
        end: new Date("2017/02/19")
      },
      zodiac: "",
      signs: "",
      sign: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      model: "",
      height: 400,
      width: 300,
      items: [
        { display_name: "30x40cm", value: [354, 472] },
        { display_name: "50x70cm", value: [590, 826] },
        { display_name: "70x100cm", value: [826 / 2, 1181 / 2] }
      ]
    };
  },
  methods: {
    changeDimensions(payload) {
      this.height = this.model[1];
      this.width = this.model[0];
    },
    getSign(date) {
      var dateInstance = new Date(date); // ------- create a new instance of date and pass the submitted date as a param -----------
      var sdate = dateInstance.getDate(); //------get just the date from the whole date -----
      var month = dateInstance.getMonth() + 1; // -----get just the month from the whole date ----------
      let submittedDate = new Date(2017, month - 1, sdate); // -------create a new formatted instace of the date ----------
      this.zodiac = getByDate(submittedDate); // pass the formatted date as a param
      this.cardData = this.zodiac;
    },
    getbysign(name) {
      let data = getByName(name);
      this.cardData = data;
    }
  },
  components: {
    sidebar
  },
  mounted() {
    this.signs = signs;
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  //   transform-origin: 50% 50%;
  //   transform: translate(-50%, -50%) scale(0.362405);
  //   font-size: 1px;
  //   left: 50%;
  //   top: 50%;
  //   box-shadow: 2em 2em 45em rgba(35, 69, 152, 0.15);
}
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
