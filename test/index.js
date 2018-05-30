const test = require('tap').test
const Diffy = require('../index')

const noop = () => {}

test('rerender', t => {
  const out = {
    on: noop,
    removeListener: noop
  }
  const diffy = new Diffy({ out })
  t.equals(diffy.fullscreen, false)
  let count = 0
  out.write = (buf) => {
    t.same(buf, Buffer.from('1'), 'first time render')
    count += 1
  }
  diffy.render(() => {
    count += 1
    return count.toString()
  })
  out.write = (buf) => {
    t.same(buf, Buffer.from('1b5b314433', 'hex'), 'second time render')
    count += 1
  }
  diffy.render()
  t.equals(count, 4, 'total count')
  t.end()
})

test('render with different output', t => {
  const out = {
    on: noop,
    removeListener: noop
  }
  const diffy = new Diffy({ out })
  let count = 0
  out.write = () => (count += 1)
  diffy.render(() => String(count += 2))
  diffy.render(() => String(count += 3))
  t.equals(count, 7, 'total count')
  t.end()
})

test('listening to resize', t => {
  let listener
  const out = {
    on (event, fn) {
      t.equals(listener, undefined)
      t.type(fn, 'function')
      t.equals(event, 'resize')
      listener = fn
    },
    removeListener: noop,
    write: noop
  }
  let renderCount = 0
  const diffy = new Diffy({
    out,
    render () {
      renderCount += 1
      return ''
    }
  })
  t.notEquals(listener, null)
  t.equals(renderCount, 1)
  listener()
  t.equals(renderCount, 2)
  diffy.destroy()
  t.end()
})

test('stop listening on destroy', t => {
  let listener
  const out = {
    on (event, fn) {
      listener = fn
    },
    removeListener (event, fn) {
      t.notEquals(listener, undefined)
      t.equals(fn, listener)
      listener = undefined
    },
    write: noop
  }
  const diffy = new Diffy({
    out,
    render: () => ''
  })
  diffy.destroy()
  t.equals(listener, undefined)
  t.end()
})

test('size of output is passed through', t => {
  const out = {
    on: noop,
    removeListener: noop,
    write: noop,
    columns: 22,
    rows: 10
  }
  const diffy = new Diffy({
    out,
    render: () => ``
  })
  t.equals(diffy.width, out.columns)
  t.equals(diffy.height, out.rows)
  t.end()
})

test('resize is modifies diffy size', t => {
  let listener
  const out = {
    on: (_, fn) => {
      listener = fn
    },
    removeListener: noop,
    write: noop,
    columns: 22,
    rows: 10
  }
  const diffy = new Diffy({
    out,
    render: () => ''
  })
  out.columns = 44
  out.rows = 20
  t.notEquals(diffy.height, out.rows)
  t.notEquals(diffy.width, out.columns)
  listener()
  t.equals(diffy.height, out.rows)
  t.equals(diffy.width, out.columns)
  t.end()
})

test('fullscreen', t => {
  let output = []
  const out = {
    on: noop,
    removeListener: noop,
    write (data) {
      output.push(data)
    }
  }
  const diffy = new Diffy({
    fullscreen: true,
    out,
    render: () => '-'
  })
  t.equals(diffy.fullscreen, true)
  t.same(output, [
    Buffer.from('1b5b3f3130343968', 'hex'),
    Buffer.from('1b5b334a1b5b481b5b324a', 'hex'),
    Buffer.from('-')
  ])
  output = []
  diffy.fullscreen = false
  diffy.render()
  t.same(output, [
    Buffer.from('1b5b3f313034396c', 'hex'),
    Buffer.from('')
  ])
  output = []
  diffy.fullscreen = true
  diffy.render()
  t.same(output, [
    Buffer.from('1b5b3f3130343968', 'hex'),
    Buffer.from('1b5b334a1b5b481b5b324a', 'hex'),
    Buffer.from('')
  ])
  diffy.destroy()
  t.end()
})

test('process listeners', t => {
  const _on = process.on
  const _removeListener = process.removeListener
  const listeners = {}
  process.on = (event, fn) => {
    t.match(event, /^SIGWINCH|exit$/)
    if (!listeners[event]) {
      listeners[event] = []
    }
    listeners[event].push(fn)
  }
  const out = {
    on: noop,
    removeListener: noop,
    write: noop
  }
  const diffy = new Diffy({
    out,
    render: () => ''
  })
  process.removeListener = (event, fn) => {
    t.fail('remove listener called')
  }
  t.deepEquals(['SIGWINCH', 'exit'], Object.keys(listeners))
  // TODO: Why is there s SIGWINCH listener & why does itt return '' ?
  t.equals(listeners.SIGWINCH[0](), '')
  t.equals(listeners.SIGWINCH.length, 1)
  t.equals(listeners.exit.length, 1)
  process.removeListener = (event, fn) => {
    t.match(event, /^SIGWINCH|exit$/)
    t.equals(listeners[event][0], fn)
    delete listeners[event]
  }
  diffy.destroy()
  t.deepEquals([], Object.keys(listeners))
  process.on = _on
  process.removeListener = _removeListener
  t.end()
})
