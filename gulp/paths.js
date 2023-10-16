import nodePath from 'path'

export const project = 'dist'
export const source = 'src'

export const paths = {
  build: {
    html: `${project}/`,
    php: `${project}/php/`,
    css: `${project}/`,
    scripts: `${project}/scripts/`,
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
      `${source}/**/*.pcss`,
      `${source}/docs/*.pcss`,
      `!${source}/styles/**/_*.pcss`,
    ],
    cssNoAccessToDist: [
      `${source}/styles/**/_*.pcss`,
    ],
    apiScripts: [
      `${source}/scripts/**/*.{ts,js}`, `!${source}/scripts/**/*.src.{ts,js}`
    ],
    sourcesScripts: `${source}/scripts/**/*.src.{ts,js}`,
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
    css: `${source}/**/*.pcss`,
    cssNoAccessToDist: `${source}/styles/**/_*.pcss`,
    php: `${source}/php/*.php`,
    demoCss: `${source}/docs/*.pcss`,
    apiScripts: [
      `${source}/scripts/**/*.{ts,js}`, `!${source}/scripts/**/*.src.{ts,js}`
    ],
    sourcesScripts: `${source}/scripts/**/*.src.{ts,js}`,
    images: `${source}/img/**/*.{gif,ico,jpg,png,webp,avif}`,
    imagesSvg: `${source}/img/**/*.svg`,
    libs: `${source}/libs/**/*.*`,
    video: `${source}/video/**/*.{mp4,webm}`,
  },
}
export const fontsFilePath = `${source}/styles/fonts.pcss`
export const pathToEnvironmentStyleFile = nodePath.resolve('./src/styles/_environment.pcss')