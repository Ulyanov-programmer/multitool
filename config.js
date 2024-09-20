// Pass additional arguments to the global object.
// It doesn't do anything by itself, but it can be used.
globalThis.isProductionMode = process.argv.includes('--production')


// Specify the name of the folders with the source files and the result files.
const outputFolder = 'dist/', sourcesFolder = 'sources/'

// Specify the paths to any folders and files.
// The paths themselves don't do anything, but you can use them.
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
    styleLayouts: sourcesFolder + 'styles/layouts/',
    scripts: sourcesFolder + 'scripts/',
    images: sourcesFolder + 'images/',
    fontsFolder: sourcesFolder + 'fonts/',
    fontsFilePath: sourcesFolder + 'styles/fonts.pcss',
    assets: sourcesFolder + 'assets/',
  },
}