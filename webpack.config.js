const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (_, { mode }) => {
  const config = {
    entry: [
      './src/index.js',
    ],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[hash].js',
    },
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({ verbose: false }),
      new HtmlWebpackPlugin({
        title: 'react-mobx-boilerplate',
        template: path.resolve(__dirname, './index.html'),
      }),
    ],

  };

  if (mode === 'development') {
    config.devServer = {
      historyApiFallback: true,
      noInfo: false,
      port: 8080,
      host: 'localhost',
      disableHostCheck: true,
    };
  }

  if (mode === 'production') {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };
  }

  return config;
};
