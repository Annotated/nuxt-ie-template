module.exports = {
  test: {
    MODE: 'test',
    VUE_APP_BASE_API: '/test',
    VUE_APP_IP: 'xx.com'
  },
  dev: {
    MODE: 'dev',
    VUE_APP_BASE_API: '/dev',
    VUE_APP_IP: 'xx.com'
  },
  prod: {
    MODE: 'prod',
    VUE_APP_BASE_API: '/prod',
    VUE_APP_IP: 'xx.com'
  }
}
