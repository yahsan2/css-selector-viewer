<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
      <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      class="footer"
      :fixed="fixed"
      app
    >
      <n-link class="mr-2" to="/">トップ</n-link>
      <n-link class="mr-2" to="/privacy">プライバシーポリシー</n-link>
      <n-link class="mr-2" to="/term">利用規約</n-link>
      <span>/ Created by <a href="https://twitter.com/yahsan2/">@yahsan2</a> &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.footer{
  padding: 10px 20px;
  text-align: center;
}
.footer span, a  {
  color: #999;
}
</style>


<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
