const path = require('path');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [require.resolve('ts-loader')]
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins.push(
    new TSConfigPathsPlugin({
      configFile: path.join(__dirname, 'tsconfig.json')
    })
  );

  return config;
};
