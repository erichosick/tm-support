// see https://webpack.js.org/configuration/ for documentation

import * as path from 'path';
import * as Webpack from 'webpack';

const webpackConfig: Webpack.Configuration = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    extensions: ['.ts'],

    // https://webpack.js.org/configuration/resolve/#resolvemodules
    modules: [
      'node_modules',
      "../../node_modules",
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },

};
export default webpackConfig;
