import chokidar from 'chokidar'
import paths from '../grunt/other/paths.js'
import htmlTask from '../api/html.js'
import beautifyHtml from '../api/beautify.js'


const CHOKIDAR_OPTIONS = {
  ignoreInitial: true,
}

chokidar
  .watch(paths.src.root + '*.html', CHOKIDAR_OPTIONS)
  .on('change',
    async path => {
      let processedFiles = await htmlTask(path)
      beautifyHtml(processedFiles)
    }
  )

// .add()
// .on('add',
//   path => htmlTask(path)
// )
