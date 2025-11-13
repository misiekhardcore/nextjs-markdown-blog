import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-plugin-prettier';

// Find the config object that has TypeScript plugin and add our custom rules
const customConfig = nextVitals.map((config) => {
  if (config.plugins && config.plugins['@typescript-eslint']) {
    return {
      ...config,
      plugins: {
        ...config.plugins,
        'testing-library': testingLibrary,
        prettier,
      },
      rules: {
        ...config.rules,
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
    };
  }
  return config;
});

export default defineConfig([
  ...customConfig,
  globalIgnores([
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
  ]),
]);
