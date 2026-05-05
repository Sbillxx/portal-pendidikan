const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOf = webpackConfig.module.rules.find(rule => rule.oneOf).oneOf;
      
      // Update CSS rule
      const cssRule = oneOf.find(rule => rule.test && rule.test.toString().includes('css'));
      if (cssRule) {
        cssRule.use = ['style-loader', 'css-loader', 'postcss-loader'];
      }
      
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      loaderOptions: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
};