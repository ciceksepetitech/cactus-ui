module.exports = {
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  cacheDirectory: '.jest-cache',
  testEnvironment: 'jsdom',
  coverageDirectory: '.jest-coverage',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>jest/setupTests.ts'],
  coveragePathIgnorePatterns: ['node_modules', '.stories.tsx', '.stories.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__test__/jest/__mocks__/styleMock.js'
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
