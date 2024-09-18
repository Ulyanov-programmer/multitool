import './config.js'
import { Plugin } from './plugins/other/_plugin.js'
import { getAllPluginNames, getPathToThePlugin } from './plugins/other/getPluginNames.js'


let tasksArg = process.argv.find(arg => arg.includes('tasks'))

tasksArg = tasksArg && tasksArg.replace("tasks=", '').split(' ')

if (!tasksArg?.length)
  tasksArg = getAllPluginNames()


for (let taskName of tasksArg) {
  let pathToTask = getPathToThePlugin(taskName)

  try {
    await import(pathToTask)
  }
  catch (error) {
    console.error(error)
  }
}

Plugin.globalEmitter.emit('tasksAreReady')