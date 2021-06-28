/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(
  common({
    localIdentName: '[path]--[local]---[hash:base64:6]',
  }),
  {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      static: path.join(__dirname, '../build'),
      port: 3000,
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify('development'),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../static/index.ejs'),
        title: '[DEV] Travel-List',
        mode: 'development',
        inject: 'head',
        scriptLoading: 'blocking',
      }),
    ],
    output: {
      library: 'main',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      filename: `[name].bundle.js`,
      path: path.resolve(__dirname, '../build'),
    },
  }
);
