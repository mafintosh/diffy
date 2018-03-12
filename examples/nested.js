var diffy = require('../')()
var trim = require('../trim')

diffy.render(function () {
  return trim(`
    Hello user. The time is:
      ${nestedDate()}
    THERE SHOULD BE NO SPACE ABOVE THIS LINE
    That is all for now
  `)
})

// re-render every 1s
setInterval(() => diffy.render(), 1000)

function nestedDate () {
  return trim(`
    ${new Date()}
  `)
}
