const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',  // Your main entry file (e.g., script.js)
  output: {
    filename: 'bundle.js',  // The final output file
    path: __dirname + '/dist'  // Where the bundled file will be placed
  },
  plugins: [
    new Dotenv()  // Automatically loads environment variables from .env file
  ]
};
