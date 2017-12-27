var differ = require('ansi-diff')
var events = require('events')
var util = require('util')

module.exports = Diffy

function Diffy (opts) {
  if (!(this instanceof Diffy)) return new Diffy(opts)
  if (!opts) opts = {}
  if (typeof opts === 'function') opts = {render: opts}

  events.EventEmitter.call(this)

  this.out = process.stdout
  this.out.on('resize', this._onresize.bind(this))
  this.differ = differ(this._dimension())
  process.on('SIGWINCH', noop)

  if (opts.render) this.render(opts.render)
}

util.inherits(Diffy, events.EventEmitter)

Object.defineProperty(Diffy.prototype, 'height', {
  enumerable: true,
  get: function () {
    return this.differ.height
  }
})

Object.defineProperty(Diffy.prototype, 'width', {
  enumerable: true,
  get: function () {
    return this.differ.width
  }
})

Diffy.prototype.render = function (fn) {
  if (fn) this._render = fn
  this.emit('render')
  this.out.write(this.differ.update(this._render()))
}

Diffy.prototype._onresize = function () {
  this.differ.resize(this._dimension())
  this.emit('resize')
  this.render()
}

Diffy.prototype._dimension = function () {
  return {
    width: this.out.columns,
    height: this.out.rows
  }
}

function noop () {
  return ''
}
