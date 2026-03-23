import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';


export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-named-as-default": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-cycle": "warn",
      "@typescript-eslint/no-shadow": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
      "no-shadow": "off",
      "no-alert": "off",
      "no-use-before-define": "off",
      "default-param-last": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "jsx-a11y/tabindex-no-positive": "off",
      "react/jsx-boolean-value": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": "off",
      "no-nested-ternary": "off",
      "import/prefer-default-export": "off",
      "import/extensions": "off",
      "sort-imports": [
        "error",
        {
          "ignoreCase": false,
          "ignoreDeclarationSort": true,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": [
            "none",
            "all",
            "multiple",
            "single"
          ],
          "allowSeparatedGroups": true
        }
      ],
      "import/order": [
        "error",
        {
          "groups": [
            "builtin", // Built-in imports (come from NodeJS native) go first
            "external", // <- External imports
            "internal", // <- Absolute imports
            [
              "sibling",
              "parent"
            ], // <- Relative imports, the sibling and parent types they can be mingled together
            "index", // <- index imports
            "unknown" // <- unknown
          ],
          "pathGroups": [
            {
              "pattern": "public/**",
              "group": "internal",
              "position": "after"
            }
          ],
          "newlines-between": "always",
          "alphabetize": {
            /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
            "order": "asc",
            /* ignore case. Options: [true, false] */
            "caseInsensitive": true
          }
        }
      ],
      'prettier/prettier': 'error'
    },
  },
])
