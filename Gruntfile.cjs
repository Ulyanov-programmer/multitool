'use strict'

require('fix-esm').register() // Allows to require any ECMAScript module in this file

const environment = require('./grunt/other/environment.js')

require('./grunt/other/server.js').default() // Starting the server
require('./grunt/other/fontsWriting.js').default() // Parsing fonts into the style file


module.exports = grunt => {
  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt)
  grunt.loadTasks('./grunt/esbuild/tasks/')
  grunt.loadTasks('./grunt/sharp/tasks/')

  grunt.initConfig({
    posthtml: require('./grunt/html/posthtml.js').default,
    postcss: require('./grunt/css/postcss.js').default,
    cssmin: require('./grunt/css/minifier&formatter.js').default,
    esbuild: require('./grunt/scripts/compiler.js').default,
    sharp: require('./grunt/images/sharp.js').default,
    prettier: require('./grunt/html/formatter.js').default,
    ttf2woff2: require('./grunt/other/ttf2woff2.js').default,
    newer: require('./grunt/other/newer.js').default,
    copy: require('./grunt/other/copy.js').default,
    watch: require('./grunt/other/watch.js').default,
    clean: require('./grunt/other/deleteDist.js').default,
  })

  grunt.registerTask('default', [
    // Delete the dist folder if the --update-dist flag is set.
    environment.isDeleteDistBeforeLaunch ? 'clean' : null,
    'sharp',
    'newer:posthtml',
    'newer:postcss',
    'newer:cssmin',
    'esbuild',
    'newer:ttf2woff2',


    'newer:copy',
    environment.isProductionMode && 'prettier',
    'watch',
  ].filter(task => task))
}


