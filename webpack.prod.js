import { merge } from 'webpack-merge';
import common from './webpack.common';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export default merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
});
