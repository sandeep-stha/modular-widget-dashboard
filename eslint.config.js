import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules/**', 'public/**', 'dist/**', 'build/**'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        NodeJS: true,
      },
    },

    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      unicorn: pluginUnicorn,
      prettier: pluginPrettier,
    },

    rules: {
      'no-console': 'error',
      'no-debugger': 'error',

      'no-duplicate-imports': 'error',

      'no-empty': 'error',
      'prefer-const': 'warn',
      'no-var': 'error',
      'no-redeclare': 'error',
      'no-unsafe-optional-chaining': 'warn',

      'object-shorthand': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],

      ...pluginReact.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      ...pluginReactHooks.configs.recommended.rules,

      'react-hooks/exhaustive-deps': 'warn',

      ...pluginReactRefresh.configs.recommended.rules,

      ...pluginImport.configs.recommended.rules,

      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      ...pluginJsxA11y.configs.recommended.rules,

      ...pluginUnicorn.configs.recommended.rules,

      'unicorn/filename-case': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/no-null': 'off',

      ...pluginPrettier.configs.recommended.rules,

      'prettier/prettier': 'error',
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
];
