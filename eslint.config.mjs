import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/jest.config.js',
      '**/tsconfig.json',
      '**/.eslintrc',
      '**/coverage/**',
      '**/stories/**',
      '**/__test__/**',
      '**/gulpfile.js',
      '**/doc-website/**',
      '**/packages/*/**/dist/**',
      '**/storybook-static/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest
      }
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      'jsx-a11y': jsxA11y
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules
    }
  }
];
