module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/explicit-member-accessibility': ['off', { overrides: { constructors: 'off' } }],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'none', requireLast: false },
        singleline: { delimiter: 'semi', requireLast: false }
      }
    ],
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',

    'arrow-body-style': 'error',
    'arrow-parens': ['off', 'as-needed'],
    'constructor-super': 'error',
    curly: 'error',
    'default-case': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-match': 'error',
    'max-classes-per-file': ['error', 1],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': 'error',
    'no-shadow': ['error', { hoist: 'all' }],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    radix: 'error',
    'use-isnan': 'error',
    'prefer-template': 'error',
    'no-nested-ternary': 'error',
    'no-param-reassign': 'error',
    'no-extra-boolean-cast': 'error',
    'object-curly-spacing': ['error', 'always'],
    'react/prop-types': 0,
    'react/display-name': 0,
    'no-async-promise-executor': 'error',
    'no-misleading-character-class': 'error',
    'no-prototype-builtins': 'error',
    'no-shadow-restricted-names': 'error',
    'no-useless-catch': 'error',
    'no-with': 'error'
  },
  settings: {
    polyfills: []
  }
}
