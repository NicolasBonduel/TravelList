/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(
  common({
    localIdentName: '[hash:base64]',
  }),
  {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../static/index.ejs'),
        title: `Travel-List`,
        mode: 'production',
        inject: 'head',
        scriptLoading: 'blocking',
      }),
    ],
    optimization: {
      moduleIds: 'deterministic',
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            format: {
              comments: false,
              ascii_only: true,
            },
            safari10: true,
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
          },
          common: {
            test: /[\\/]src[\\/]/,
            chunks: 'all',
            minSize: 0,
          },
        },
      },
    },
    output: {
      library: 'main',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      filename: `[name].bundle.[contenthash].js`,
      chunkFilename: '[name].chunk.[contenthash].js',
      path: path.resolve(__dirname, '../build'),
    },
  }
);
