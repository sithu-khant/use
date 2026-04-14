// pnpm add -D eslint @eslint/js @eslint/json @eslint/markdown @stylistic/eslint-plugin eslint-plugin-simple-import-sort globals typescript-eslint

import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export const config = defineConfig(
  {
    ...js.configs.recommended,
    files: ['**/*.js', '**/*.mjs']
  },

  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{ts}']
  })),

  {
    ignores: ['**/.wrangler', '**/worker-configuration.d.ts']
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@stylistic': stylistic
    }
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  },

  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended']
  },

  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended']
  },

  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended']
  },

  {
    rules: {
      'no-debugger': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'off',
        { argsIgnorePattern: '^_' }
      ],
      '@stylistic/indent': ['warn', 2],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/no-extra-semi': 'warn',
      '@stylistic/quotes': [
        'warn',
        'single',
        { avoidEscape: true }
      ],
      '@stylistic/comma-dangle': ['warn', 'never'],
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
          maxEOF: 1
        }
      ],
      '@stylistic/no-trailing-spaces': 'warn'
    }
  }
);
