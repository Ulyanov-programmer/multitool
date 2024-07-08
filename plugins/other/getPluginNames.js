import { globSync } from 'glob'
import path from 'path'

export function getPluginNames() {
  let taskPaths = globSync('./plugins/*.*')

  return taskPaths.map(taskPath => path.parse(taskPath).name)
}