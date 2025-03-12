module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Обработка TypeScript
  },
  moduleNameMapper: {
    '\\.(jpeg|jpg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',  // Мок для изображений
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transformIgnorePatterns: ['node_modules/(?!your-module)'],
};
