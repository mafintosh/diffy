var diffy = require('../')()
var trim = require('../trim')

var text = 'lowercase'

process.once('SIGINT', function () {
  text = 'UPPERCASE'
  diffy.render(render)
  process.nextTick(process.exit)
})

diffy.render(render)

// re-render every 1s
setInterval(() => diffy.render(), 1000)

function render () {
  return trim(`
    Hello world.
    Error should happen on last line:
    ${text}
  `)
}
