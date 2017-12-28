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
  var widLen = diffy.width.toString().length
  var wid = Math.max(diffy.width - 2 * widLen - 1 - 6, 10)
  if (pos >= wid - 1) pos = wid - 2
  var i = 1
  var s = 'Move the cursor <left> or <right>\n['
  for (; i < pos; i++) s += ' '
  s += ch
  i++
  for (; i < wid - 1; i++) s += ' '
  s += '] ' + (pos - 1) + '/' + (wid - 3) + '\n'
  if (ch === '>') s += 'You are moving <right>'
  else s += 'You are moving <left>'
  return s
}
