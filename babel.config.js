module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@lib': './src/lib',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@stores': './src/stores',
            '@types': './src/types',
            '@services': './src/services',
            '@assets': './src/assets',
            '@styles': './src/styles'
          }
        }
      ]
    ]
  };
};
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@lib': './src/lib',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@stores': './src/stores',
            '@types': './src/types',
            '@services': './src/services',
            '@styles': './src/styles',
            '@assets': './assets'  // ← اشاره به پوشه assets در روت
          }
        }
      ]
    ]
  };
};