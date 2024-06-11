import chokidar from 'chokidar'
import paths from './grunt/other/paths.js'
import { posthtmlConfig } from './api/posthtml.js'
import { beautifyHtmlConfig, beautifyCssConfig } from './api/beautify.js'
import {
  cacacheHtmlConfig,
  cacacheCssConfig,
  cacacheFontsConfig,
} from './api/cacache.js'
import { postcssConfig } from './api/postcss.js'
import { esbuildConfig } from './api/esbuild.js'
import { copyAssets } from './plugins/other/copy.js'
import { deleteDist } from './plugins/other/deleteDist.js'
import { cleanCache } from './plugins/other/cleanCache.js'
import { ttf2Woff2Config } from './api/ttf2woff2.js'

import { isDeleteDistBeforeLaunch, isProductionMode } from './grunt/other/environment.js'
import { isFontsConverted } from './grunt/other/checkFontFilesConverted.js'

// import './grunt/other/server.js'
import './grunt/other/fontsWriting.js' // Parsing fonts into the style file



if (isDeleteDistBeforeLaunch) {
  deleteDist()
  cleanCache()
}

copyAssets()

ttf2Woff2Config.runProcess(
  await cacacheFontsConfig.getChangedFiles()
)

await esbuildConfig.runProcess()

beautifyHtmlConfig.runProcess(
  await posthtmlConfig.runProcess(
    await cacacheHtmlConfig.getChangedFiles()
  )
)

beautifyCssConfig.runProcess(
  await postcssConfig.runProcess(
    await cacacheCssConfig.getChangedFiles()
  )
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
      await posthtmlConfig.runProcess()
    )
  })
chokidar.watch(paths.src.styles + '*.pcss')
  .on('change', async path => {
    beautifyCssConfig.runProcess(
      await postcssConfig.runProcess(
        await cacacheCssConfig.getChangedFiles(path)
      )
    )
  })
chokidar.watch(paths.src.fontsFolder + '*.{otf,ttf}', { ignoreInitial: true })
  .on('add', async path => {
    ttf2Woff2Config.runProcess(
      await cacacheFontsConfig.getChangedFiles(path)
    )
  })








