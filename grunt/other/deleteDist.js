import paths from './paths.js'

export default {
  dest: paths.dest.root + '*.html',
  styles: paths.dest.styles + '*',
  scripts: paths.dest.scripts + '**/*',
  images: paths.dest.images + '**/*',
  assets: paths.dest.assets + '**/*',
  fonts: paths.dest.fonts + '*',
}
