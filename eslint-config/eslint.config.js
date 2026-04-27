// pnpm add -D eslint @eslint/js @eslint/markdown @stylistic/eslint-plugin eslint-plugin-jsonc eslint-plugin-simple-import-sort globals typescript-eslint
// For SvelteKit projects
// pnpm add -D eslint-plugin-svelte svelte-eslint-parser

import js from '@eslint/js';
import markdown from '@eslint/markdown';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// For Svelte
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

export default defineConfig(
  {
    ...js.configs.recommended,
    files: ['**/*.js', '**/*.mjs']
  },

  ...tseslint.configs.recommended,

  {
    ignores: ['**/.svelte-doctor', '**/.svelte-kit', '**/.wrangler', '**/worker-configuration.d.ts']
  },

  // --- For Svelte ---
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte']
      }
    },
    plugins: {
      svelte
    },
    rules: {
      ...svelte.configs.recommended.rules,
      'svelte/html-quotes': [
        'warn',
        {
          prefer: 'single',
          dynamic: {
            quoted: false,
            avoidInvalidUnquotedInHTML: false
          }
        }
      ],
      'svelte/indent': ['warn', {
        indent: 2,
        alignAttributesVertically: true
      }],
      'svelte/no-at-html-tags': 'off',
      'svelte/block-lang': ['error', {
        script: ['ts']
      }],
      'svelte/button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: true
        }
      ]
    }
  },
  // --- For Svelte ---

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
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended']
  },

  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    plugins: {
      jsonc: eslintPluginJsonc
    },
    language: 'jsonc/x',
    rules: {
      'jsonc/indent': ['warn', 2]
    }
  },

  stylistic.configs.recommended,
  stylistic.configs.customize({
    severity: 'warn',
    semi: true,
    commaDangle: 'never'
  }),

  {
    rules: {
      'no-debugger': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ]
    }
  }
);
