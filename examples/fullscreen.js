var diffy = require('diffy')({fullscreen: true})
var input = require('diffy/input')()
var fs = require('fs')

var src = fs.readFileSync(__filename, 'utf-8')
var tmp = src
var upper = false

diffy.render(function () {
  return tmp
})

input.on('enter', function () {
  upper = !upper
  tmp = upper ? src.toUpperCase() : src
  diffy.render()
})
