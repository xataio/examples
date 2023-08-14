/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'next',
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['react', 'jsx-a11y', 'check-file'],
  rules: {
    'no-unused-expressions': ['error', { enforceForJSX: true }],
    'import/no-default-export': 0,
    'import/no-anonymous-default-export': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'jsx-a11y/no-autofocus': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-curly-brace-presence': [1, { props: 'never', propElementValues: 'always' }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            importNames: ['default'],
            message:
              "Please import only the functions you need to reduce bundle size. E.g. import { range } from 'lodash'"
          }
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.test.ts{,x}'],
      rules: {
        'no-restricted-imports': 0 // this are purely for bundle size
      }
    },
    {
      files: ['*.stories.ts{,x}'],
      rules: {
        'import/no-default-export': 0 // storybook uses default export
      }
    }
  ]
};
