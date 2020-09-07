module.exports = {
  root: true,
  extends: ['prettier', 'prettier/@typescript-eslint', 'prettier/standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['build/**/*.js', '.eslintrc.js'],
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    'no-shadow': ['warn', { hoist: 'never' }],
    'indent': 'off',
  },
};
