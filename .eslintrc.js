module.exports = {
	extends: ['react-app', 'prettier'],
	plugins: ['jest', 'babel', 'jsx-a11y'],
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
    }
}
