'use strict'

const co = require('co')
const plugins = require('../../plugins')

function * run (context) {
  const ref = context.args.plugin
  yield plugins.install(ref)
}

module.exports = {
  topic: 'plugins',
  command: 'install',
  description: 'install a plugin',
  args: [{name: 'plugin'}],
  run: co.wrap(run)
}
