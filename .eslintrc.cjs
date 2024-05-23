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
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', 'node_modules', 'build', 'public', 'assets'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react-refresh',
    '@typescript-eslint',
    'unused-imports',
    'simple-import-sort',
    'prettier',
    'unicorn',
    '@stylistic/eslint-plugin-js',
    'react',
    'react-hooks',
  ],
  rules: {
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreIIFE: true,
      },
    ],
    eqeqeq: 'error',
    'no-console': 'warn',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { consistent: true, multiline: true },
        ObjectPattern: { consistent: true, multiline: true },
        ImportDeclaration: { consistent: true, multiline: true },
        ExportDeclaration: { consistent: true, multiline: true },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-shadow': ['error'],

    'react/jsx-filename-extension': [1, { extensions: ['.js', '.ts', '.tsx', '.jsx'] }],
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': [1, { ignoreFunctionalComponents: true }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  noInlineConfig: true,
};
