const test = require('tap').test
const trim = require('../trim')

test('simple string', t => {
  const output = trim('  hello  ')
  t.equals(output, '  hello  ')
  t.end()
})

test('multiline, no spaces', t => {
  const output = trim('hello\nworld\nmantis')
  t.equals(output, 'hello\nworld\nmantis')
  t.end()
})

test('multiline, space', t => {
  const output = trim('\nhello\nworld\nmantis')
  t.equals(output, 'hello\nworld\nmantis')
  t.end()
})

test('date example', t => {
  const date = new Date()
  const output = trim(`
  Hello user. The time is:
    ${date}
  That is all for now
`)
  t.equals(output, 'Hello user. The time is:\n  ' + date.toString() + '\nThat is all for now')
  t.end()
})

test('date example es6', t => {
  const date = new Date()
  const output = trim`
  Hello user. The time is:
    ${date}
  That is all for now
`
  t.equals(output, 'Hello user. The time is:\n  ' + date.toString() + '\nThat is all for now')
  t.end()
})

test('various indent trimming', t => {
  const output = trim(`
  1.
    2.
   3.
  4.
 5.
6.
    7.
     8.
      9.
`)
  t.equals(output, '1.\n  2.\n 3.\n4.\n 5.\n6.\n  7.\n   8.\n    9.')
  t.end()
})

test('ignoring empty line begining/end', t => {
  const output = trim(`


  1.
    2.
    3.


`)
  t.equals(output, '1.\n  2.\n  3.')
  t.end()
})

test('allowing empty line in content', t => {
  const output = trim(`
  1.

    2.
    3.`)
  t.equals(output, '1.\n\n  2.\n  3.')
  t.end()
})

test('other data types', t => {
  t.equals(trim(0), 0)
  t.equals(trim(null), null)
  t.equals(trim(undefined), undefined)
  const obj = {}
  t.equals(trim(obj), obj)
  t.equals(trim(true), true)
  t.end()
})
