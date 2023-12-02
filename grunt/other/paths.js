const project = 'dist/',
  sources = 'sources/'

export default {
  dest: {
    root: project,
    styles: project + 'styles/',
    scripts: project + 'scripts/',
    images: project + 'images/',
    fonts: project + 'fonts/',
    assets: project + 'assets/',
  },
  src: {
    root: sources,
    styles: sources + 'styles/',
    scripts: sources + 'scripts/',
    images: sources + 'images/',
    fontsFolder: sources + 'fonts/',
    fontsFilePath: sources + 'styles/fonts.pcss',
    assets: sources + 'assets/',
  },
}
