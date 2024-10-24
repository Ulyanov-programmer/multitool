import browserSync from 'browser-sync'

/** 
 * This plugin starts the server with the ability to automatically restart when files in the directory with the result files are changed.
 */

browserSync.create()
  .init({
    server: {
      baseDir: globalThis.config.output.root,
    },
    port: 1243,
    notify: false,
    watch: true,
  })