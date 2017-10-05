var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  resolve:{
    modulesDirectories: ['node_modules', 'bower_components']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        exclude: /node_modules|passion_wall_code/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|passion_wall_code/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  eslint: {
    configFile: '.eslintrc.js'
  }
};
