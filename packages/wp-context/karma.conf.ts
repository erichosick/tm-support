import * as path from 'path';
import * as karma from 'karma';

import webpackConfig from './webpack.config';

const outputPath = path.join(__dirname, '_karma_webpack_');

// use a different output path for testing than building
if (webpackConfig?.output?.path) {
  webpackConfig.output.path = outputPath;
} else {
  throw Error('Webpack.config must have an output.path configured.');
}


const karamConfigOptions: karma.ConfigOptions = {
  frameworks: ["jasmine", "karma-typescript"],
  files: [
    "src/**/*.ts", // *.tsx for React Jsx
    "__tests__/**/*.ts"
  ],
  preprocessors: {
    "**/*.ts": "karma-typescript" // *.tsx for React Jsx
  },
  reporters: ["progress", "karma-typescript"],
  // browsers: ["Chrome"],
  browsers: ["ChromeHeadless", "Chrome"],
  webpack: webpackConfig,

  autoWatchBatchDelay: 250,
  autoWatch: true,
  singleRun: false,

} as karma.ConfigOptions;
// NOTE: Forcing type with 'as' because webpack is not a property on
// karma.ConfigOptions but expected for karma-typescript. Still have not figured
// out how to get the write ConfigOptions type for 

const config = (config: karma.Config) => {
  config.set(karamConfigOptions);
};

export default config;
