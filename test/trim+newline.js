const test = require('tap').test
const trim = require('../trim+newline')
const os = require('os')

test('date example', t => {
  const date = new Date()
  const output = trim(`
  Hello user. The time is:
    ${date}
  That is all for now
`)
  t.equals(output, 'Hello user. The time is:\n  ' + date.toString() + '\nThat is all for now' + os.EOL)
  t.end()
})
