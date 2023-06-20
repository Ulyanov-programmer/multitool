import nodePath from 'path'

export const project = 'dist'
export const source = 'src'

export const paths = {
  build: {
    html: `${project}/`,
    php: `${project}/php/`,
    css: `${project}/styles/`,
    scripts: `${project}/scripts/`,
    scriptModules: `${project}/scripts/modules/`,
    images: `${project}/img/`,
    fonts: `${project}/fonts/`,
    libs: `${project}/libs/`,
    video: `${project}/video/`,
  },
  src: {
    html: [
      `${source}/*.{html,htm}`,
      `!${source}/components/*.{html,htm}`,
    ],
    php: `${source}/php/*.php`,
    css: [
      `${source}/styles/**/*.pcss`,
      `${source}/docs/*.pcss`,
      `!${source}/styles/**/_*.pcss`,
    ],
    cssNoAccessToDist: [
      `${source}/styles/**/_*.pcss`,
    ],
    scripts: `${source}/scripts/*.{ts,js}`,
    scriptModules: `${source}/scripts/modules/*.{ts,js}`,
    images: `${source}/img/**/*.{gif,ico,webp,avif,png,jpg}`,
    imagesSvg: `${source}/img/**/*.svg`,
    fonts: `${source}/fonts/*.{ttf,otf}`,
    fontsWoff: `${source}/fonts/*.{woff,woff2}`,
    fontsFolder: `${source}/fonts/`,
    libs: `${source}/libs/**/*.*`,
    video: `${source}/video/**/*.{mp4,webm}`,
  },
  watch: {
    html: `${source}/**/*.{html,htm,php}`,
    css: `${source}/styles/**/*.pcss`,
    cssNoAccessToDist: `${source}/styles/**/_*.pcss`,
    php: `${source}/php/*.php`,
    demoCss: `${source}/docs/*.pcss`,
    scripts: `${source}/scripts/*.{ts,js}`,
    scriptModules: `${source}/scripts/modules/*.{ts,js}`,
    images: `${source}/img/**/*.{gif,ico,jpg,png,webp,avif}`,
    imagesSvg: `${source}/img/**/*.svg`,
    libs: `${source}/libs/*.*`,
    video: `${source}/video/**/*.{mp4,webm}`,
  },
}
export const fontsFilePath = `${source}/styles/general/fonts.pcss`
export const distPath = `${source}/styles/general/fonts.pcss`
export const pathToEnvironmentStyleFile = nodePath.resolve('./src/styles/_environment.pcss')