<template>
  <div>
    <v-app-bar color="deep-grey" absolute app>
      <v-app-bar-nav-icon @click="drawer = true" class="d-block d-sm-block d-md-none"></v-app-bar-nav-icon>
      <div>
				<v-toolbar-title>MAP</v-toolbar-title>
			</div>
			
			<v-spacer></v-spacer>

      <router-link to class="d-none d-sm-none d-md-inline-block">
				<p class="overline mb-0 mx-2 grey-5 mw-max">WORD AT</p>
			</router-link>
			<hr class="mx-2" />
			<router-link to class="d-none d-sm-none d-md-inline-block">
				<p class="overline grey-5 mb-0 mx-2 mw-max">HELP</p>
			</router-link>
			<router-link to class="d-none d-sm-none d-md-inline-block">
				<p class="overline grey-5 mb-0 mx-2 mw-max">PRODUCTS</p>
			</router-link>
			<hr class="mx-2" />
			<v-select :items="['English','Germany']" label="Country" class="select" dense solo />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary class="d-block d-sm-block d-md-none">
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-title>
							<p class="overline mb-0 mx-2 grey-5 mw-max">WORD AT</p>
						</v-list-item-title>
          </v-list-item>
					<v-list-item>
            <v-list-item-title>
							<p class="overline grey-5 mb-0 mx-2 mw-max">HELP</p>
						</v-list-item-title>
          </v-list-item>
					<v-list-item>
            <v-list-item-title>
							<p class="overline grey-5 mb-0 mx-2 mw-max">PRODUCTS</p>
						</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
<style scoped>
>>>.v-text-field__details{
	display: none !important;
}
@media screen and (max-width: 768px) {
	>>>.select .v-input__control .v-input__slot{
		width: 110px;
	}
}
</style>
