module.exports = {
  // Config
  testEnvironment: 'node',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['node_modules/', 'build/'],
  setupFiles: ['./jest.setup.ts'],
  // Coverage
  collectCoverageFrom: ['src/**/*.ts', '!src/*.test.ts'],
  coverageDirectory: 'coverage',
};
