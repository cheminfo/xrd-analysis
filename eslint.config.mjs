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
    rules: {},
  },
]);
