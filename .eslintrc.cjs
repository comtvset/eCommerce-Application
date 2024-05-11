module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'build', 'public', 'assets'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['react-refresh', '@typescript-eslint', 'unused-imports', 'simple-import-sort', 'prettier', 'unicorn', '@stylistic/js'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    eqeqeq: 'error',
    'no-console': 'warn',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.ts', '.tsx', '.jsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
  },
  noInlineConfig: true,
};
