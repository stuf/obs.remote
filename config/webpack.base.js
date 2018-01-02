const path = require('path');

module.exports = {
  entry: {
    // polyfills: './src/polyfills.js',
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].bundle.js'
  },
  externals: [
    'karet.util',
    'kefir',
    'partial.lenses',
    'ramda',
    'ws'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|\.test\.js$)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
