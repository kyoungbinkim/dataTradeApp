/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const extraNodeModules = require('node-libs-browser');

module.exports = {
  // resolver: {
  //   sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
  //   extraNodeModules,
  // },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
