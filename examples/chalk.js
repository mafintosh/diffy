var diffy = require('../')()
var trim = require('../trim')
var chalk = require('chalk')

var text = 'this is not red'

process.once('SIGINT', function () {
  text = chalk.red('this is red')
  diffy.render(render)
  process.exit()
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
