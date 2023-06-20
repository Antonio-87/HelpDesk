import { HotModuleReplacementPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

export default merge(common, {
  // Set the mode to development or production
  mode: 'development',
  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 9000
  },

  plugins: [
    // Only update what has changed on hot reload
    new HotModuleReplacementPlugin(),
  ],
});
