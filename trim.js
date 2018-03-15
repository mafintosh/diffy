var deindent = require('./deindent')

module.exports = trim

function trim (s) {
  if (!/^\r?\n/.test(s)) return s
  return deindent(s).trim()
}
