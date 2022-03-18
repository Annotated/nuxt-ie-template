const env = require('./env')

export default {
  env: {
    NUXT_ENV: env[process.env.MODE]
  },
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-ie-template',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/js/flexible.min.js' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/reset.scss',
    'swiper/dist/css/swiper.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/axios',
      ssr: true // 服务端
    },
    {
      src: '~/plugins/elementui',
      ssr: true // 服务端
    },
    {
      src: '~/plugins/swiper',
      ssr: false // 服务端
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt'
  ],

  styleResources: {
    scss: ['~/assets/styles/index.scss']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: env[process.env.MODE].VUE_APP_BASE_API,
    proxy: false
  },

  proxy: {
    '/dev/': {
      target: `http://${env[process.env.MODE].VUE_APP_IP}`, // 代理转发的地址
      changeOrigin: true,
      pathRewrite: {
        '^/dev': ''
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://www.nuxtjs.cn/api/configuration-build#transpile
    transpile: ['/^element-ui/', 'ufo'],
    // analyze: true,
    // assetFilter: function (assetFilename) {
    //   return assetFilename.endsWith('.js')
    // }

    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 16,
          // 匹配CSS中的属性，* 代表启用所有属性
          propList: ['*'],
          // 转换成rem后保留的小数点位数
          unitPrecision: 5,
          // 小于12px的样式不被替换成rem
          minPixelValue: 12,
          // 忽略一些文件，不进行转换，比如我想忽略 依赖的UI框架
          exclude: ['node_modules']
        }
      }
    }
  }
}
