const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/sistema/',
  devServer: {
    port: 8081
  }
});
