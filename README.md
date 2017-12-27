# diffy

A tiny framework for building diff based interactive command line tools.

```
npm install diffy
```

[![Build Status](https://travis-ci.org/mafintosh/diffy.svg?branch=master)](https://travis-ci.org/mafintosh/diffy)

Basically React, but in the terminal powered by [ansi-diff](https://github.com/mafintosh/ansi-diff) and [neat-input](https://github.com/mafintosh/neat-input).

## Usage

``` js
var diffy = require('diffy')()
var trim = require('diffy/trim')

diffy.render(function () {
  return trim(`
    Hello user. The time is:
      ${new Date()}
    That is all for now
  `)
})

// re-render every 1s
setInterval(() => diffy.render(), 1000)
```

You can also use `diffy` to query input from a user

``` js
var input = require('diffy/input')({style: style})
var names = []

input.on('update', () => diffy.render())
input.on('enter', (line) => names.push(line))

diffy.render(function () {
  return trim(`
    Enter your name: ${input.line()}
    List of names: ${names.join(' ')}
  `)
})

function style (start, cursor, end) {
  return start + '[' + (cursor || ' ') + ']' + end
}
```

See the examples folder for more.

## API

#### `var diffy = require('diffy')()`

Make a new diffy instance. Writes to stdout.

#### `diffy.render([function])`

Trigger a render and/or update the default render
function. A render function should simply return a string
containing the output you wish to display and then `diffy` will make sure to only print the diff.

#### `diffy.width`

Property containing the width of the terminal.

#### `diffy.height`

Property containing the height of the terminal.

#### `diffy.on('resize')`

Emitted when the terminal is resized. Triggers a render as well.

#### `diffy.on('render')`

Emitted just before a render happens.

#### `var input = require('diffy/input')()`

Get a [neat-input](https://github.com/mafintosh/neat-input) instance. Use this if you want to accept interactive input.

#### `var trim = require('diffy/trim')`

Helper function that trims the indentation of a multiline string. Useful if you have a render function that returns an indented string like in the above example.

## Credits

Thank you to [@Fouad](https://github.com/Fouad) for donating the module name.

## License

MIT
