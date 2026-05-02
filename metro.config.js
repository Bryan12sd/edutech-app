const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {};

const mergedConfig = mergeConfig(defaultConfig, customConfig);

module.exports = wrapWithReanimatedMetroConfig(mergedConfig);