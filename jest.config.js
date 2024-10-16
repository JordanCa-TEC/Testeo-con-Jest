module.exports = {
    verbose: true,
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)"
    ]
  };
  