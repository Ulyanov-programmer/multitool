// // import  from './grunt/other/environment.js'
// import { isFontFilesConverted } from './grunt/other/checkFontFilesConverted.js'
// isFontFilesConverted()

// // Starting the server
// import { server } from './grunt/other/server.js'
// server()

// // Parsing fonts into the style file
// import { fontsWriting } from './grunt/other/fontsWriting.js'
// fontsWriting()


import './plugins/chokidar.js'
import { posthtmlConfig } from './api/posthtml.js'
import { beautifyHtmlConfig } from './api/beautifyHtml.js'


let processedFiles = await posthtmlConfig.runProcess()
processedFiles = beautifyHtmlConfig.runProcess(processedFiles)






