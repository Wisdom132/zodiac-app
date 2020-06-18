import Vue from "vue"
import Vuetify from "vuetify"

Vue.use(Vuetify)

// Style sheets
import "vuetify/dist/vuetify.min.css"

const config = {
   icons: {
      iconfont: "mdi"
   }
}

export default new Vuetify(config)