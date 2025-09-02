/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // юнит-тесты с DOM
  testMatch: ['**/*.spec.ts', '!**/*.api.spec.ts'], // всё, кроме api
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // алиасы как в tsconfig.json
  },
  transform: {
    '^.+\\.ts$': 'ts-jest' // обрабатываем ts файлы через ts-jest
  },
  maxWorkers: '50%'
};
