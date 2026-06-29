import reactPlugin from '@eslint-react/eslint-plugin';
import eslintJsPlugin from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globalsPlugin from 'globals';
import tseslintPlugin from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.{js,ts,tsx}'],
  extends: [
    eslintJsPlugin.configs.recommended,
    tseslintPlugin.configs.recommendedTypeChecked,
  ],
  languageOptions: {
    globals: {
      ...globalsPlugin.node,
      ...globalsPlugin.browser,
    },
    parserOptions: {
      project: ['tsconfig.json'],
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': tseslintPlugin.plugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    ...eslintConfigPrettier.rules,
    ...eslintJsPlugin.configs.recommended.rules,
    'prefer-const': 'error',
    'no-undef': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'no-duplicate-imports': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ['multiple', 'single', 'all', 'none'],
        allowSeparatedGroups: true,
      },
    ],
    'react/prop-types': 0,
    'react/jsx-indent': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignores: ['**/.expo', '**/.vscode', 'node_modules/*'],
});
