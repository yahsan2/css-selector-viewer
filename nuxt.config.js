const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'CSS セレクタを可視化できる CSS Selector Viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'CSS セレクタの影響範囲を可視化したり、シェアできたります。' },
      // twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@yahsan2' },
      { name: 'twitter:image', content: 'https://css-selector-viewer.netlify.com/ogp.png' },

      // Facebook
      { property: 'fb:app_id', content: '' },
      {
        property: 'og:title',
        content: 'CSS セレクタを可視化できる CSS Selector Viewer',
        hid: 'ogTitle'
      },
      { property: 'og:site_name', content: 'CSS Selector Viewer' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://css-selector-viewer.netlify.com', hid: 'ogUrl' },
      { property: 'og:locale', content: 'ja_JP' },
      { property: 'og:image', content: 'https://css-selector-viewer.netlify.com/ogp.png', hid: 'ogImage' },
      {
        property: 'og:description',
        content: 'CSS セレクタの影響範囲を可視化したり、シェアできたります。',
        hid: 'ogDesc'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/google-analytics', {
      id: process.env.GOOGLE_ANALYTICS_ID　|| 'UA-XXXXXXXXXX-1'
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
