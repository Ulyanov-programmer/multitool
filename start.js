// // import  from './grunt/other/environment.js'
// import { isFontFilesConverted } from './grunt/other/checkFontFilesConverted.js'
// isFontFilesConverted()

// // Starting the server
// import { server } from './grunt/other/server.js'
// server()

// // Parsing fonts into the style file
// import { fontsWriting } from './grunt/other/fontsWriting.js'
// fontsWriting()


import './tasks/chokidar.js'
import htmlTask from './api/html.js'
import beautifyHtml from './api/beautify.js'


let processedFiles = await htmlTask()
processedFiles = beautifyHtml(processedFiles)






