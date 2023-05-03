module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'next',
        'next/core-web-vitals',
        'prettier',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint', 'sort-destructure-keys', 'json'],
    rules: {
        // Prettier config
        'prettier/prettier': [
            1,
            {
                jsxSingleQuote: false,
                printWidth: 120,
                tabWidth: 4,
                singleQuote: true,
                trailingComma: 'all',
            },
        ],
        // JSON - [FACEPALM] had to list all props to simulate 'recommended'
        // as overriding doesn't work :(
        // More info - https://www.npmjs.com/package/eslint-plugin-json
        'json/undefined': 'error',
        'json/enum-value-mismatch': 'error',
        'json/unexpected-end-of-comment': 'error',
        'json/unexpected-end-of-string': 'error',
        'json/unexpected-end-of-number': 'error',
        'json/invalid-unicode': 'error',
        'json/invalid-escape-character': 'error',
        'json/invalid-character': 'error',
        'json/property-expected': 'error',
        'json/comma-expected': 'error',
        'json/colon-expected': 'error',
        'json/value-expected': 'error',
        'json/comma-or-close-backet-expected': 'error',
        'json/comma-or-close-brace-expected': 'error',
        'json/trailing-comma': 1,
        'json/duplicate-key': 'error',
        'json/comment-not-permitted': 'error',
        'json/schema-resolve-error': 'error',
        'json/unknown': 1,
        // So that .ts and .tsx should not be in imports
        'import/extensions': [
            'error',
            {
                json: 'always',
                ts: 'never',
                tsx: 'never',
                css: 'always',
            },
        ],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin', // Built-in types are first
                    'external',
                    'internal',
                    'unknown',
                    ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
                    'index', // Then the index file
                    'object',
                ],
                pathGroups: [
                    {
                        pattern: '@*/**',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: '@*Config',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: 'react',
                        group: 'builtin',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                warnOnUnassignedImports: true,
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        // So that Type Definitions which have /// don't throw an error
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        // So that typescript files can't have JSX
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z][a-zA-Z0-9]+$',
                    match: true,
                },
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
                custom: {
                    regex: '^T[A-Z][a-zA-Z0-9]+$',
                    match: true,
                },
            },
        ],
        'import/prefer-default-export': 'off',
        'sort-destructure-keys/sort-destructure-keys': 2,
        'sort-keys': [0, 'asc', { natural: true, minKeys: 3 }], // For later
        'react/require-default-props': 0,

        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 0,

        '@typescript-eslint/camelcase': 0, // Turn this on later, airbnb hadn't updated this yet
        camelcase: [0, { properties: 'always' }],
        // Disable base rule as it can report incorrect errors https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md#how-to-use
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
    },
    ignorePatterns: ['**/lib/**', '**/package.json'],
};
