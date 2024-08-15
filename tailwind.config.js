// next.config.js
const path = require('path');
module.exports = {
  darkMode: 'class', // hoặc 'media'
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
        ],
        include: path.resolve(__dirname, './src/styles'),
      });
    }

    return config;
  },
};

module.exports = {
  theme: {
    extend: {
      animation: {
        slide: 'slide 15s linear infinite',
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
