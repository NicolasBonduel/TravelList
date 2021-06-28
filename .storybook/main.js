const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.dev.config');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          'hooks/persistedState': path.resolve(__dirname, '../__mocks__/hooks/persistedState.js'),
          ...webpackConfig.resolve.alias,
        },
        extensions: [...config.resolve.extensions, ...webpackConfig.resolve.extensions],
      },
      plugins: [
        ...config.plugins,
        ...[
          new webpack.ProgressPlugin(),
          new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[name].[contenthash].css',
          }),
        ],
      ],
      module: {
        ...config.module,
        rules: [...config.module.rules, ...webpackConfig.module.rules],
      },
    };
  },
};
