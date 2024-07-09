import browserSync from 'browser-sync'

browserSync.create()
  .init({
    server: {
      baseDir: globalThis.paths.output.root,
    },
    port: 1243,
    notify: false,
    watch: true,
  })