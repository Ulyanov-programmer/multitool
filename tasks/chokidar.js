import chokidar from 'chokidar'
import paths from '../grunt/other/paths.js'
import htmlTask from '../api/html.js'


const CHOKIDAR_OPTIONS = {
  ignoreInitial: true,
}

chokidar
  .watch(paths.src.root + '*.html', CHOKIDAR_OPTIONS)
  .on('add',
    path => htmlTask(path)
  )
  .on('change',
    path => htmlTask(path)
  )

// .add()
// .on('add',
//   path => htmlTask(path)
// )
