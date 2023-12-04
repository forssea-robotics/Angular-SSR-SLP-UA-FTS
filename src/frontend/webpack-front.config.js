console.log('custom webpack front config');

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "readline": false,
      "util": false,
      "child_process": false,
      "constants": false,
      "assert": false,
      "stream": false,
      "zlib": false,
      "crypto": false,
      "http": false,
      "https": false
    },
  },
};