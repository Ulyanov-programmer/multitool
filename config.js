import { EventEmitter } from 'node:events'
// ? This is necessary to trigger special events inside plugins.
globalThis.emitter = new EventEmitter()


globalThis.isProductionMode = process.argv.includes('--production')


const outputFolder = 'dist/', sourcesFolder = 'sources/'

globalThis.paths = {
  root: './',
  output: {
    root: outputFolder,
    styles: outputFolder + 'styles/',
    scripts: outputFolder + 'scripts/',
    images: outputFolder + 'images/',
    fonts: outputFolder + 'fonts/',
    assets: outputFolder + 'assets/',
  },
  sources: {
    root: sourcesFolder,
    htmlComponents: sourcesFolder + 'components/',
    styles: sourcesFolder + 'styles/',
    scripts: sourcesFolder + 'scripts/',
    images: sourcesFolder + 'images/',
    fontsFolder: sourcesFolder + 'fonts/',
    fontsFilePath: sourcesFolder + 'styles/fonts.pcss',
    assets: sourcesFolder + 'assets/',
  },
}
