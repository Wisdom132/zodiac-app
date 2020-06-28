<template>
  <section class="d-flex">
    <v-card class="mx-auto w-100 bg-grey-2 mt-5" :height="height" :width="width">
      <v-card-text class="text-center">
        <p class="display-1 text--primary text-uppercase">{{cardData.header}}</p>
        <v-list-item-title class="headline mb-1 text-uppercase">{{cardData.divider}}</v-list-item-title>
        <v-list-item-subtitle class="text-uppercase">{{cardData.tagline}}</v-list-item-subtitle>
        <v-list-item-subtitle class="text-uppercase">{{cardData.subline}}</v-list-item-subtitle>
      </v-card-text>
    </v-card>

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
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Customize Text</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-text-field
                        label="Header Line"
                        v-model="cardData.header"
                        placeholder="Placeholder"
                        outlined
                      ></v-text-field>
                      <v-text-field
                        label="Divider"
                        v-model="cardData.divider"
                        placeholder="Placeholder"
                        outlined
                      ></v-text-field>
                      <v-text-field
                        label="Tagline"
                        v-model="cardData.tagline"
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
import ZodiacService from "./finder.js";
import sidebar from "./sidebar";
export default {
  data() {
    return {
      cardData: {
        header: "",
        divider: "AIR",
        tagline: "PROGRESSIVE • IMAGINATIVE • INDEPENDENT",
        subline: "JAN 20 - FEB 18"
      },
      zodiac: "",
      dateKeeper: {
        day: "",
        month: ""
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      model: "",
      height: 400,
      width: 300,
      items: [
        { display_name: "30x40cm", value: [300, 400] },
        { display_name: "50x70cm", value: [500, 700] },
        { display_name: "70x100cm", value: [700, 1000] }
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
      this.zodiac = ZodiacService(submittedDate); // pass the formatted date as a param
      this.cardData.header = this.zodiac.name;
    }
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
