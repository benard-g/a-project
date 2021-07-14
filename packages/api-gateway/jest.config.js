module.exports = {
  // Config
  testEnvironment: 'node',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['node_modules/', 'build/'],
  // Test options
  clearMocks: true,
  // Coverage
  collectCoverageFrom: ['src/**/*.ts', '!src/*.test.ts'],
  coverageDirectory: 'coverage',
};
