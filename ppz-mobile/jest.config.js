module.exports = {
  moduleDirectories: [
    'node_modules',
    'utils', // a utility folder
    __dirname, // the root directory
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  globals: {"__DEV__": true}
}