import gulp from 'gulp'
import fs from 'fs-extra'
import { project, paths } from './paths.js'
const isDeleteDistBeforeLaunch = process.argv.includes('--update-dist')

export default function deleteDist() {
  if (isDeleteDistBeforeLaunch) {
    fs.removeSync(`./${project}`)
    console.log('Dist is deleted.')
  }

  return gulp.src(paths.src.html)
}