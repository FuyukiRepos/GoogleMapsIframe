const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.googleapikey': JSON.stringify(process.env.googleapikey),
    }),
  ],
};

