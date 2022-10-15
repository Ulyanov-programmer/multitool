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
		css: [`${source}/styles/**/*.sass`, `${source}/docs/*.sass`],
		scripts: `${source}/scripts/*.{ts,js}`,
		scriptModules: `${source}/scripts/modules/*.{ts,js}`,
		imagesOther: `${source}/img/**/*.{gif,ico,webp,avif}`,
		imagesPng: `${source}/img/**/*.png`,
		imagesJpg: `${source}/img/**/*.jpg`,
		imagesSvg: `${source}/img/**/*.svg`,
		fonts: `${source}/fonts/*.{ttf,otf}`,
		fontsWoff: `${source}/fonts/*.{woff,woff2}`,
		fontsFolder: `${source}/fonts/`,
		libs: `${source}/libs/*.*`,
	},
	watch: {
		html: `${source}/**/*.{html,htm,php}`,
		css: `${source}/styles/**/*.sass`,
		php: `${source}/php/*.php`,
		demoCss: `${source}/docs/*.sass`,
		scripts: `${source}/scripts/*.{ts,js}`,
		scriptModules: `${source}/scripts/modules/*.{ts,js}`,
		imagesOther: `${source}/img/**/*.{gif,ico,webp,avif}`,
		imagesPng: `${source}/img/**/*.png`,
		imagesJpg: `${source}/img/**/*.jpg`,
		imagesSvg: `${source}/img/**/*.svg`,
		libs: `${source}/libs/*.*`,
	},
}
export const fontsFIlePath = `${source}/styles/general/fonts.sass`