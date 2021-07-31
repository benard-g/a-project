module.exports = {
  root: false,
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  extends: ['react-app', 'react-app/jest', 'plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  ignorePatterns: ['*.codegen.ts'],
  rules: {},
};
