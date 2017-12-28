var diffy = require('../')()
var input = require('../input')()

var pos = 0
var ch = '>'

input.on('left', function () {
  pos--
  ch = '<'
  diffy.render()
})

input.on('right', function () {
  pos++
  ch = '>'
  diffy.render()
})

diffy.render(render)

function render () {
  if (pos < 1) pos = 1
  if (pos >= diffy.width - 1) pos = diffy.width - 2
  var i = 1
  var s = 'Move the cursor <left> or <right>\n['
  for (; i < pos; i++) s += ' '
  s += ch
  i++
  for (; i < diffy.width - 1; i++) s += ' '
  s += ']\n'
  if (ch === '>') s += 'You are moving <right>'
  else s += 'You are moving <left>'
  return s
}
