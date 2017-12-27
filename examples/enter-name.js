var diffy = require('../')()
var input = require('../input')({style: style})
var trim = require('../trim')

var names = []

input.on('update', () => diffy.render())
input.on('enter', (line) => names.push(line))

diffy.render(function () {
  return trim(`
    Enter your name: ${input.line()}
    List of names: ${names.join(', ')}
  `)
})

function style (start, cursor, end) {
  return start + '[' + (cursor || ' ') + ']' + end
}
