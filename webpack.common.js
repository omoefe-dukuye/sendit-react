import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'mini-css-extract-plugin';

dotenv.config();

export default {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            }
          }
        ]
      }, 
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          ExtractTextPlugin.loader, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?outputPath=images/'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader?outputPath=images/'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css' }),
    new webpack.EnvironmentPlugin([
      'API_ROOT_URL',
    ])
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.jsx', '.js', '.png', '.svg', '.ico', '.jpg']
  }
};
