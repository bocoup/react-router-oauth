// Based on the examples in https://github.com/rackt/react-router

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

const getPath = (...args) => path.join(__dirname, ...args);

export default {
  devtool: 'cheap-module-eval-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-router-oauth': getPath('../build'),
    },
  },

  entry: fs.readdirSync(getPath()).reduce((entries, dir) => {
    const stat = fs.statSync(getPath(dir));
    if (stat.isDirectory()) {
      entries[dir] = getPath(dir, 'app');
    }
    return entries;
  }, {}),

  output: {
    path: getPath('__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/',
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: getPath(),
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: getPath(),
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
  ],
};
