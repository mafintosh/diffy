var trim = require('./trim')
var os = require('os')

module.exports = trimAndNewline

function trimAndNewline (s) {
  return trim(s) + os.EOL
}
