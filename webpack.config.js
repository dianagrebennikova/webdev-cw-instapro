const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js', // точка входа
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
    open: true,
    client: {
      overlay: true,
    },
    onListening: function (devServer) {
      if (!devServer) throw new Error('webpack-dev-server is not defined');
      console.log(`Dev server listening on port ${devServer.server.address().port}`);
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },  
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // твой шаблон
      favicon: './favicon.ico',  // вот эта строка — путь к фавиконке
    }),
  ],
  
};
