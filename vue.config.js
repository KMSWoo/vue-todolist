const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 8080, // 指定端口
    client: {
      logging: 'info',
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use((req, res, next) => {
        console.log(`Request: ${req.method} ${req.url}`);

        const originalEnd = res.end;
        res.end = function (...args) {
          console.log(`Response: ${res.statusCode} ${res.statusMessage}`);
          originalEnd.apply(res, args);
        };

        next();
      });

      return middlewares;
    },
  },
});
