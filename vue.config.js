module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'url',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 此处开启 https
    // https: true
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
}