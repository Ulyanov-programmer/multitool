'use strict'

// Allows to require any ECMAScript module in this file
require('fix-esm').register()

const environment = require('./grunt/other/environment.js')
const isFontFilesConverted = require('./grunt/other/checkFontFilesConverted.js')
  .isFontFilesConverted()

require('./grunt/other/server.js')
  .server() // Starting the server
require('./grunt/other/fontsWriting.js')
  .fontsWriting() // Parsing fonts into the style file


module.exports = grunt => {
  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt)
  grunt.loadTasks('./grunt/esbuild/tasks/')

  grunt.initConfig({
    ...require('./grunt/html/posthtml.js'),
    ...require('./grunt/css/postcss.js'),
    ...require('./grunt/css/minifier&formatter.js'),
    ...require('./grunt/scripts/compiler.js'),
    ...require('./grunt/images/sharp.js'),
    ...require('./grunt/html/formatter.js'),
    ...require('./grunt/other/ttf2woff2.js'),
    ...require('./grunt/other/newer.js'),
    ...require('./grunt/other/copy.js'),
    ...require('./grunt/other/watch.js'),
    ...require('./grunt/other/deleteDist.js'),
  })

  grunt.registerTask('default', [
    // Delete the dist folder if the --update-dist flag is set.
    environment.isDeleteDistBeforeLaunch && 'clean',
    'sharp',
    'posthtml',
    'newer:postcss',
    'newer:cssmin',
    'esbuild',
    !isFontFilesConverted && 'ttf2woff2',

    'newer:copy',
    environment.isProductionMode && 'prettify',
    'watch',
  ].filter(task => task))
}


