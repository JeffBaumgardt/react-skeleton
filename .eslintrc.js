module.exports = {
    extends: ['react-app', './node_modules/react-tools/eslint.js'],
    rules: {
        'react/prop-types': 'off', // we have TS!
        'react/no-did-mount-set-state': 'off',
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': [
            'error',
            {
                jpg: 'always',
                png: 'always',
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                json: 'always',
                JPG: 'always',
            },
        ],
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-return-await': 'off',
        'no-shadow': 'off',
        'no-console': 'warn',
        'jest/prefer-called-with': 'warn',
        'jest/valid-expect-in-promise': 'warn',
        '@typescript-eslint/no-var-requires': 'off',
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            rules: {
                'no-undef': 'off', // eslint fires no-undef in type annotations, bad
            },
        },
        {
            files: ['**/*.test.ts?(x)'],
            rules: {
                'max-lines-per-function': 'off',
            },
        },
    ],
}
