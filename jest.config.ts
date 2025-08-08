import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest to compile TS files
  testEnvironment: 'node', // Node.js environment for backend testing
  verbose: true, // Show detailed test results
  coverageDirectory: 'coverage', // Where to output coverage reports
  collectCoverage: true, // Enable coverage collection
  testPathIgnorePatterns: ['/node_modules/'], // Ignore node_modules folder
  transform: {
    '^.+\\.ts?$': 'ts-jest', // Use ts-jest for ts files
  },
  // Match all .test.ts or .spec.ts files under src (adjust if tests are elsewhere)
  testMatch: ['<rootDir>/src/**/*.(test|spec).ts'],
  // Collect coverage from all TS files except tests and index files
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/*.spec.ts', '!src/**/index.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1', // Adjust if you use path aliases in tsconfig.json
  },
  clearMocks: true, // Automatically clear mocks after each test
  // Optional: Uncomment and create this file if you want to setup Jest globals
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
