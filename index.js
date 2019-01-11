const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config");
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const app = express();
/**
 * Feflow 会调用这个模块，并传入两个参数给构建器
 * @param {string} cmd 用户在使用 feflow 构建时传给 feflow 的命令，例如执行 feflow dev 时 cmd 是 dev
 * @param {string} ctx feflow 上下文，和插件上下文一致
 */
module.exports = (cmd, ctx) => {
  if (cmd === "dev") {
    /* 本地开发构建逻辑 */
    const devConfig = config({ mode: "development" })
    devConfig.entry = [
        // 可以通过 http://localhost:8080/ 访问
        devConfig.entry
    ]
    const compiler = webpack(devConfig);
   // 配置devServer
    app.use(
      webpackDevMiddleware(compiler, {
        // publicPath: devConfig.output.publicPath, // 默认就会使用devConfig的publicPath
        hot: true,
        color: true,
        stats: "errors-only" // 为了减少webpack不必要的输出，将stats设为errors-only
      })
    );

    // 加入热更新中间件
    app.use(webpackHotMiddleware(compiler));


    // Serve the files on port.
    app.listen('8080', function(res, err) {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `Webpack server listening on port 8080\n`+
          `Open http://127.0.0.1:8080 to checkout`
        );
      }
    });
  } else if (cmd === "build") {
    /* 生产环境打包构建逻辑 */
    webpack(config({}), (err, stats) => {
      console.log(
        stats.toString({
          chunks: false,
          colors: true,
          children: false
        })
      );
    });
  }
};
