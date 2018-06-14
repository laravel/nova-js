module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    axios: true,
    _: true,
    Nova: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        trailingComma: 'es5',
        bracketSpacing: true,
        parser: 'flow',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
