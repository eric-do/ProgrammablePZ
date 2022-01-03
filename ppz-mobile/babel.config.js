module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ["./"],
          extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
          alias: {
            "features": ["./features"],
            "components": ["./components"],
            "types": ["./types"],
            "utils": ["./utils"],
            "store": ["./store"]
          }
        }
      ],
    ]
  };
};