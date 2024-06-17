console.log('custom webpack server config');

const webpack = require('webpack');

module.exports = {
  //target: 'async-node16.11',
  externals: {
    externalsPresets: {
      node: true,
    },
    ws: "ws",
    // ADD HERE YOUR CUSTOM EXTERNAL LIBS
    // lib: 'lib',
  },
  experiments: {
    topLevelAwait: true
  },
  plugins:[
    new webpack.IgnorePlugin({ resourceRegExp: /osx-temperature-sensor$/, }),
  ]
};
