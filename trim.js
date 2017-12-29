module.exports = trim

function trim (s) {
  if (!/^\r?\n/.test(s)) return s
  var indent = (s.match(/\n([ ]+)/m) || [])[1] || ''
  s = indent + s.trim()
  return s.split('\n')
    .map(l => replace(indent, l))
    .join('\n') + '\n'
}

function replace (prefix, line) {
  return line.slice(0, prefix.length) === prefix ? line.slice(prefix.length) : line
}
