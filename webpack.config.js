const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js', // Your entry file (could be script.js)
  output: {
    filename: 'bundle.js',  // Output bundled file
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv(),  // Automatically loads variables from .env
  ]
};
