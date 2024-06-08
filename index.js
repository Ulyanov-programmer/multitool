import chokidar from 'chokidar'
import paths from './grunt/other/paths.js'
import { posthtmlConfig } from './api/posthtml.js'
import { beautifyHtmlConfig } from './api/beautifyHtml.js'
import { cacacheHtmlConfig, cacacheCssConfig } from './api/cacache.js'
import { postcssConfig } from './api/postcss.js'

import { isDeleteDistBeforeLaunch, isProductionMode } from './grunt/other/environment.js'
import { isFontsConverted } from './grunt/other/checkFontFilesConverted.js'

// import './grunt/other/server.js'
import './grunt/other/fontsWriting.js' // Parsing fonts into the style file


beautifyHtmlConfig.runProcess(
  await posthtmlConfig.runProcess(
    await cacacheHtmlConfig.getChangedFiles()
  )
)
postcssConfig.runProcess(
  await cacacheCssConfig.getChangedFiles()
)


chokidar.watch(paths.src.root + '*.html')
  .on('change', async path => {
    beautifyHtmlConfig.runProcess(
      await posthtmlConfig.runProcess(
        await cacacheHtmlConfig.getChangedFiles(path)
      )
    )
  })
chokidar.watch(paths.src.root + 'components/*.html')
  .on('change', async path => {
    beautifyHtmlConfig.runProcess(
      await posthtmlConfig.runProcess(
        await cacacheHtmlConfig.getChangedFiles()
      )
    )
  })
chokidar.watch(paths.src.styles + '*.pcss')
  .on('change', async path => {
    postcssConfig.runProcess(
      await cacacheCssConfig.getChangedFiles()
    )
  })







