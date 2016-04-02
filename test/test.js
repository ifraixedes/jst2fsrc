'use strict'

const assert = require('assert')
const t2f = require('..')

/* eslint-disable no-eval */
describe('t2f("greeting", "Hi ${name}")', () => {
  const rs = t2f('greeting', 'Hi ${name}')

  it('returns a string with "function greeting(name)"', () => {
    assert(/function greeting\(name\)/.test(rs))
  })

  it('returns a string with "return `Hi ${name}`"', () => {
    assert(/return `Hi \$\{name\}`/.test(rs))
  })

  it('allows to eval the returned string as function definition', () => {
    const er = eval(`(${rs}('Test'))`)
    assert.equal('Hi Test', er)
  })
})

describe('t2f("greeting", "Hi ${ojb.name}")', () => {
  const rs = t2f('greeting', 'Hi ${obj.name}')

  it('returns a string with "function greeting(name)"', () => {
    assert(/function greeting\(obj\)/.test(rs))
  })

  it('returns a string with "return `Hi ${ojb.name}`"', () => {
    assert(/return `Hi \$\{obj\.name\}`/.test(rs))
  })

  it('allows to eval the returned string as function definition', () => {
    const er = eval(`(${rs}({name: 'Test'}))`)
    assert.equal('Hi Test', er)
  })
})

describe('t2f("greeting", "hi ${ojb.name}, your total amount is ${total}")', () => {
  const rs = t2f('greeting', 'hi ${obj.name}, your total amount is ${total}')

  it('returns a string with "function greeting(name)"', () => {
    assert(/function greeting\(obj, total\)/.test(rs))
  })

  it('returns a string with "return `hi ${name}, your total amount is ${total}`"', () => {
    assert(/return `hi \$\{obj\.name\}, your total amount is \${total}`/.test(rs))
  })

  it('allows to eval the returned string as function definition', () => {
    const er = eval(`(${rs}({name: 'test'}, 100))`)
    assert.equal('hi test, your total amount is 100', er)
  })
})

describe('t2f("greeting", "hi ${ojb.name}, your total amount is ${5 + tota}")', () => {
  const rs = t2f('greeting', 'hi ${obj.name}, your total amount is ${5 + total}')

  it('returns a string with "function greeting(name)"', () => {
    assert(/function greeting\(obj, total\)/.test(rs))
  })

  it('returns a string with "return `hi ${obj.name}, your total amount is ${5 + total}`"', () => {
    assert(/return `hi \$\{obj\.name\}, your total amount is \${5 \+ total}`/.test(rs))
  })

  it('allows to eval the returned string as function definition', () => {
    const er = eval(`(${rs}({name: 'test'}, 100))`)
    assert.equal('hi test, your total amount is 105', er)
  })
})

describe('t2f("greeting", "`Hi ${d.client.name}, your total amount is ${getTotal() + 5} ${country.currency}`")', () => {
  const rs = t2f('greeting', 'Hi ${d.client.name}, your total amount is ${getTotal() + 5} ${country.currency}')

  it('returns a string with "function greeting(name)"', () => {
    assert(/function greeting\(d, getTotal, country\)/.test(rs))
  })

  it('returns a string with "return `Hi ${d.client.name}, your total amount is ${getTotal()} ${country.currency}`"', () => {
    assert(/return `Hi \$\{d\.client\.name\}, your total amount is \${getTotal\(\) \+ 5} \${country.currency}`/.test(rs))
  })

  it('allows to eval the returned string as function definition', () => {
    const er = eval(`(${rs}({ client: { name: 'Test' } }, () => 95, { currency: 'EUR' }))`)
    assert.equal('Hi Test, your total amount is 100 EUR', er)
  })
})

