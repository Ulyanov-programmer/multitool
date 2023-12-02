import browserSync from 'browser-sync'
import paths from './paths.js'

export default function () {
  browserSync.exit()

  let server = browserSync.create()

  server.init({
    server: {
      baseDir: paths.dest.root,
    },
    port: 1243,
    notify: false,
    watch: true,
  })
}