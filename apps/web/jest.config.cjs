module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: { 
          jsx: 'react-jsx', 
          esModuleInterop: true,
          module: 'esnext',
        },
        diagnostics: false,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/setup.ts'],
};