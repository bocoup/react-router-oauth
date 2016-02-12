// Based on the examples in https://github.com/rackt/react-router

import fs from 'fs';
import path from 'path';
import express from 'express';
import rewrite from 'express-urlrewrite';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.babel';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
  },
}));

fs.readdirSync(__dirname).forEach(file => {
  const stat = fs.statSync(path.join(__dirname, file));
  if (stat.isDirectory()) {
    app.use(rewrite(`/${file}/*`, `/${file}/index.html`));
  }
});

app.use(express.static(__dirname));

app.listen(8080, function() {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop.');
});
