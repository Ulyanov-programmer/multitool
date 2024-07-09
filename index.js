import './paths.js'
import { EventEmitter } from 'node:events'
import { getPluginNames } from './plugins/other/getPluginNames.js'

import { deleteDistBeforeLaunch } from './plugins/other/environment.js'

import './plugins/other/server.js'
import './plugins/other/fontsWriting.js' // Parsing fonts into the style file

if (deleteDistBeforeLaunch)
  await import('./plugins/other/deleteDist.js')

import './plugins/other/copy.js'



globalThis.emitter = new EventEmitter()



let tasksArg = process.argv.find(arg => arg.includes('tasks'))

tasksArg = tasksArg && tasksArg.replace("tasks=", '').split(' ')

if (!tasksArg?.length)
  tasksArg = getPluginNames()


for (let taskName of tasksArg) {
  import(`./plugins/${taskName}.js`)
    .then(task => new task.default())
}