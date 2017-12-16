const webpack = require('webpack');
const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  resolve: {
    alias: {
      modules: 'bundles/modules',
      app: 'bundles/app',
      partials: 'bundles/partials',
      libs: 'libs',
      helpers: 'helpers',
      styles: 'src/styles',
      locales: 'locales',
    }
  },
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ]
}

module.exports = config;

if (devBuild) {
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
}
