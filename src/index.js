'use strict'

const esprima = require('esprima')

module.exports = templateToFunction

function templateToFunction(fnName, tpl) {
  let ids = getIdentifiers(`\`${tpl}\``)
  let args = Array.from(ids.values())

  return `function ${fnName}(${args.join(', ')}) {
    return \`${tpl}\`
  }`
}

function getIdentifiers(tpl) {
  const tl = esprima.tokenize(tpl)

  const identifiers = new Set()
  let objProp = false

  for (let t of tl) {
    switch (t.type.toLowerCase()) {
      case 'template':
        objProp = false
        break
      case 'identifier':
        if (objProp) {
          break
        }

        identifiers.add(t.value)
        break
      case 'punctuator':
        if (t.value === '.') {
          objProp = true
          break
        }

        objProp = false
    }
  }

  return identifiers
}

