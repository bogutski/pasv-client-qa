module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: ['mocha'],
  extends: ['plugin:mocha/recommended', 'eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    browser: false,
    $: false,
    $$: false,
    driver: false,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'mocha/no-mocha-arrows': 0,
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
