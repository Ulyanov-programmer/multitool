import './config.js'
import { getAllPluginNames, getPathToThePlugin } from './plugins/other/getPluginNames.js'


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
        console.error(error)
      }
    })
}