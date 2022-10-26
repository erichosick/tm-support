import * as path from 'path';
import * as karma from 'karma';

import webpackConfig from './webpack.config';


// use a different output path for testing than building
if (webpackConfig?.output?.path) {
  webpackConfig.output.path = path.join(__dirname, '_karma_webpack_');
} else {
  throw Error('Webpack.config must have an output.path configured.');
}

const karamConfigOptions: karma.ConfigOptions = {
  frameworks: ["jasmine", "karma-typescript", "karma-typescript_color"],
  files: [
    "src/**/*.ts", // *.tsx for React Jsx
    // "__tests__/**/*.ts",
    // "../**/src/**/*.ts"
  ],
  preprocessors: {
    "**/*.ts": "karma-typescript", // *.tsx for React Jsx
    // "__tests__/**/*.ts": "karma-typescript",
    // "../**/src/**/*.ts": "karma-typescript"
  },
  reporters: ["progress", "karma-typescript"],
  // browsers: ["Chrome"],
  // browsers: ["ChromeHeadless", "Chrome"],
  browsers: ["ChromeHeadless"],
  webpack: webpackConfig,

  autoWatchBatchDelay: 250,
  autoWatch: true,
  singleRun: false,

} as karma.ConfigOptions;
// NOTE: Forcing type with 'as' because webpack is not a property on
// karma.ConfigOptions but expected for karma-typescript. Still have not figured
// out how to get the write ConfigOptions type for 

const config = (config: karma.Config) => {
  config.set({
    ...karamConfigOptions,
    logLevel: config.LOG_DEBUG,
  });
};

export default config;
