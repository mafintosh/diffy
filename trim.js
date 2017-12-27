module.exports = trim

function trim (s) {
  if (!/^\r?\n/.test(s)) return s
  var indent = (s.match(/\n([ ]+)/m) || [])[1] || ''
  s = indent + s.trim()
  return s.split('\n')
    .map(l => l.replace(indent, ''))
    .join('\n') + '\n'
}
