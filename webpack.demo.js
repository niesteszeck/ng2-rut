'use strict';

const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, 'demo', 'src');
const production = process.argv.indexOf('--dist') > -1;
const outPath = production ? 'dist' : 'build';
const devtool = production ? 'source-map' : 'eval-source-map';

const config = {
  target: 'web',
  cache: true,
  entry: {
    app: path.join(srcPath, 'demo-app.module.ts'),
    common: [
      'reflect-metadata/Reflect.js',
      'zone.js/dist/zone.js',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/forms',
      '@angular/core',
      '@angular/common',
    ],
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['node_modules'],
    alias: {},
  },
  output: {
    path: path.join(__dirname, 'demo', outPath),
    publicPath: '/demo/dist/',
    filename: 'app.js',
    pathInfo: true,
  },

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
      },
      { test: /\.html/, loader: 'html?-minimize' },
    ],
  },
  ts: {
    configFileName: 'tsconfig.demo.json',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: Infinity,
    }),
    new webpack.NoErrorsPlugin(),
  ],
  debug: true,
  devtool,
};
if (production) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: false,
  }));
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
}

module.exports = config;
