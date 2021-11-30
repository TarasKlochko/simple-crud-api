const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    server: './server.js',
  },
  target: 'node',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
};
