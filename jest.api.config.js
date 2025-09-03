/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.api.spec.ts'], // только api тесты
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // алиасы как в tsconfig.json
  },
  transform: {
    '^.+\\.ts$': 'ts-jest' // обрабатываем ts файлы через ts-jest
  },
  maxWorkers: 1, // 🚨 строго последовательно
  globalSetup: './src/test-helpers/global-setup.ts',
  globalTeardown: './src/test-helpers/global-teardown.ts'
};
