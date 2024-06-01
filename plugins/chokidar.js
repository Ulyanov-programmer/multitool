import chokidar from 'chokidar'
import paths from '../grunt/other/paths.js'
import { posthtmlConfig } from '../api/posthtml.js'
import { beautifyHtmlConfig } from '../api/beautifyHtml.js'


const CHOKIDAR_OPTIONS = {
  ignoreInitial: true,
}

chokidar
  .watch(paths.src.root + '*.html', CHOKIDAR_OPTIONS)
  .on('change',
    async path => {
      let processedFiles = await posthtmlConfig.runProcess(path)
      beautifyHtmlConfig.runProcess(processedFiles)
    }
  )

// .add()
// .on('add',
//   path => htmlTask(path)
// )
