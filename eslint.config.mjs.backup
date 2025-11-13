import nextPlugin from '@next/eslint-plugin-next';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/jest.config.js',
      '**/cypress.config.ts',
      '**/jest.setup.js',
      '**/lint-staged.config.js',
      '**/next.config.js',
      '**/prettier.config.js',
      '**/next-env.d.ts',
      '.next/**',
      '.yarn/**',
      '.swc/**',
      'node_modules/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tseslint,
      'testing-library': testingLibrary,
      prettier,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];
