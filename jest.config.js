const {jest: jestConfig} = require('react-tools/config')

module.exports = Object.assign(jestConfig, {
    coverageThreshold: null,
    setupFilesAfterEnv: ['<rootDir>/tests/setup-env.ts'],
})
