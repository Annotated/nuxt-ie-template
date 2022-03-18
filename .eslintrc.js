module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  overrides: [
    {
      files: ['*.vue'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'space-before-function-paren': 'off',
    // https://github.com/nuxt-community/axios-module/issues/555
    'import/named': 0
  }
}
