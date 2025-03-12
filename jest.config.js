module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",  // для работы с TypeScript
      },
      moduleNameMapper: {
        // Мокируем импорты изображений
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
      },
      transformIgnorePatterns: [
        "node_modules/(?!(module-name)/)",  // Если необходимо, добавьте необходимые библиотеки
      ],
};