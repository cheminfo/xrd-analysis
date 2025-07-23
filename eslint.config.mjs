import { defineConfig } from 'eslint/config';
import cheminfo from 'eslint-config-cheminfo';

export default defineConfig([
  ...cheminfo,
  {
    languageOptions: {
      globals: {
        __dirname: 'readonly',
      },
    },
    rules: {
      'import/extensions': [
        'error',
        'always',
        {
          js: 'always',
          jsx: 'always',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  },
]);
