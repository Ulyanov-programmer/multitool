import './paths.js'
import { EventEmitter } from 'node:events'
import { getAllPluginNames, getPathToThePlugin } from './plugins/other/getPluginNames.js'


globalThis.emitter = new EventEmitter()


let tasksArg = process.argv.find(arg => arg.includes('tasks'))

tasksArg = tasksArg && tasksArg.replace("tasks=", '').split(' ')

if (!tasksArg?.length)
  tasksArg = getAllPluginNames()


for (let taskName of tasksArg) {
  let pathToTask = getPathToThePlugin(taskName)

  import(pathToTask)
    .then(task => {
      try {
        new task.default()
      }
      catch (error) {
        throw new Error(
          'The task does not have a default exported class with constructor / function!'
        )
      }
    })
}