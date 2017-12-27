var diffy = require('../')()
var trim = require('../trim')

diffy.render(function () {
  return trim(`
    Hello user. The time is:
      ${new Date()}
    That is all for now
  `)
})

// re-render every 1s
setInterval(() => diffy.render(), 1000)
