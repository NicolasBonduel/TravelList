/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = ({ localIdentName }) => ({
  entry: './index.jsx',
  target: 'web',
  resolve: {
    alias: {
      hooks: path.resolve(__dirname, '../src/hooks'),
      components: path.resolve(__dirname, '../src/components'),
      src: path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'static',
          globOptions: {
            dot: false,
            ignore: ['*.ejs'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName,
                getLocalIdent: (context, _localIdentName, localName) => {
                  // If the CSS/SCSS file starts with `__`, we not use CSS modules
                  if (context.resourcePath.toLowerCase().match(/__.*\.(sa|sc|c)ss$/)) {
                    return localName;
                  }
                  return undefined;
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer, postcssPresetEnv()],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
});
