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
  },
  scr: {
    html: [`${source}/**/*.html`, `!${source}/**/*.htm`],
    php: `${source}/php/*.php`,
    css: [`${source}/styles/**/*.styl`, `${source}/docs/*.styl`, `!${source}/styles/**/_*.styl`],
    scripts: `${source}/scripts/*.{ts,js}`,
    scriptModules: `${source}/scripts/modules/*.{ts,js}`,
    images: `${source}/img/**/*.{gif,ico,webp,avif,png,jpg}`,
    imagesSvg: `${source}/img/**/*.svg`,
    fonts: `${source}/fonts/*.{ttf,otf}`,
    fontsWoff: `${source}/fonts/*.{woff,woff2}`,
    fontsFolder: `${source}/fonts/`,
    libs: `${source}/libs/*.*`,
  },
  watch: {
    html: `${source}/**/*.{html,htm,php}`,
    css: `${source}/styles/**/*.styl`,
    php: `${source}/php/*.php`,
    demoCss: `${source}/docs/*.styl`,
    scripts: `${source}/scripts/*.{ts,js}`,
    scriptModules: `${source}/scripts/modules/*.{ts,js}`,
    images: `${source}/img/**/*.{gif,ico,webp,avif}`,
    imagesPng: `${source}/img/**/*.png`,
    imagesJpg: `${source}/img/**/*.jpg`,
    imagesSvg: `${source}/img/**/*.svg`,
    libs: `${source}/libs/*.*`,
  },
}
export const fontsFIlePath = `${source}/styles/general/fonts.styl`