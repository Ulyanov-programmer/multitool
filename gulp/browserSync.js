import browsersync from 'browser-sync'
import { paths } from './paths.js'

export default function browserSyncFunc() {
  browsersync.init({
    server: {
      baseDir: paths.build.html,
    },
    port: 3000,
    notify: false,
  })
}