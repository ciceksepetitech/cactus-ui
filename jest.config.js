module.exports = {
  roots: ['<rootDir>/packages'],
  cacheDirectory: '.jest-cache',
  testEnvironment: 'jsdom',
  coverageDirectory: '.jest-coverage',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>jest/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '/dist/',
    '.stories.ts',
    'node_modules',
    '.stories.tsx'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__test__/jest/__mocks__/styleMock.js'
  },
  coverageThreshold: null
};
