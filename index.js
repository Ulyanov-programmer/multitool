import chokidar from 'chokidar'
import paths from './grunt/other/paths.js'
import { posthtmlConfig } from './api/posthtml.js'
import { beautifyHtmlConfig } from './api/beautifyHtml.js'

// import  from './grunt/other/environment.js'
import { isFontFilesConverted } from './grunt/other/checkFontFilesConverted.js'
isFontFilesConverted()

// Starting the server
import { server } from './grunt/other/server.js'
server()

// Parsing fonts into the style file
import { fontsWriting } from './grunt/other/fontsWriting.js'
fontsWriting()


beautifyHtmlConfig.runProcess(
  await posthtmlConfig.runProcess()
)


chokidar.watch(paths.src.root + '*.html')
  .on('change',
    async path => {
      beautifyHtmlConfig.runProcess(
        await posthtmlConfig.runProcess(path)
      )
    }
  )
chokidar.watch(paths.src.root + 'components/*.html')
  .on('change',
    async path => {
      beautifyHtmlConfig.runProcess(
        await posthtmlConfig.runProcess()
      )
    }
  )







