export default {
  clearMocks: true,

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'test/coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'docs',
    'dist',
    'example',
    'home',
    'temporary',
    'test/temporary'
  ],

  coverageProvider: 'v8',

  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true
    }
  },

  rootDir: '.',

  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'docs',
    'dist',
    'example',
    'test/temporary',
    'src'
  ]
}
