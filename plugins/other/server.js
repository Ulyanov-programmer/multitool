import browserSync from 'browser-sync'
import { paths } from '../../paths.js'

function server() {
  browserSync.exit()

  let server = browserSync.create()

  server.init({
    server: {
      baseDir: paths.output.root,
    },
    port: 1243,
    notify: false,
    watch: true,
  })
}

server()