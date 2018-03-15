var diffy = require('../')()
var deindent = require('../deindent')

diffy.render(function () {
  return deindent(`
    Hello user. The time is:
      ${new Date()}
    That is all for now
  `)
})

// re-render every 1s
setInterval(() => diffy.render(), 1000)
