var diffy = require('../')()
require('../input')()

process.stdin.on('keypress', (ch) => {
  if (ch === 'f') {
    diffy.fullscreen = !diffy.fullscreen
    diffy.render()
  }
})

const HORZ = '═'
const VERT = '║'
const TOP_LEFT = '╔'
const BOTTOM_LEFT = '╚'
const TOP_RIGHT = '╗'
const BOTTOM_RIGHT = '╝'

function repeat (char, count) {
  return new Array(count + 1).join(char)
}

function drawInFrame (width, height, content) {
  const rows = []
  for (var row = 0; row < height; row++) {
    const isTop = row === 0
    const isBottom = row === height - 1
    const isMiddle = row === (height / 2) | 0
    let line
    if (isTop || isBottom) {
      line = (isTop ? TOP_LEFT : BOTTOM_LEFT)
      line += repeat(HORZ, width - 2)
      line += (isTop ? TOP_RIGHT : BOTTOM_RIGHT)
    } else {
      line = VERT
      if (isMiddle) {
        const w1 = ((width - content.length - 2) / 2) | 0
        line += repeat(' ', w1)
        line += content
        line += repeat(' ', width - content.length - w1 - 2)
      } else {
        line += repeat(' ', width - 2)
      }
      line += VERT
    }
    rows.push(line)
  }
  return rows.join('\n')
}

diffy.render(function () {
  const content = `<press f>`
  if (diffy.fullscreen) {
    return drawInFrame(diffy.width, diffy.height, content)
  }
  return content
})
