/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // юнит-тесты с DOM
  testMatch: ['**/*.spec.ts', '**/*.spec.tsx', '!**/*.api.spec.ts'], // всё, кроме api
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // алиасы как в tsconfig.json
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(png|jpg|jpeg|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^next/image$': '<rootDir>/__mocks__/next/image.tsx'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx'
        }
      }
    ] // обрабатываем ts/tsx файлы через ts-jest
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  maxWorkers: '50%'
};
