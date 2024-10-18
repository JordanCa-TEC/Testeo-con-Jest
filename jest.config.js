module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest', 
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+\\.js$",
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  collectCoverage: true, 
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.js", 
    "!src/serviceWorker.js", 
  ],
  coverageReporters: ["text", "lcov"], 
};

