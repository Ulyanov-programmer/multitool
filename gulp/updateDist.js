import fs from 'fs-extra'
import { project } from './paths.js'
const isDeleteDistBeforeLaunch = process.argv.includes('--update-dist')

export default function updateDist() {
  if (isDeleteDistBeforeLaunch) {
    fs.removeSync(`./${project}`)
  }
}