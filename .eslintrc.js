module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'eslint:recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-throw-literal': 'off',
    'require-await': 'off'
  }
}
