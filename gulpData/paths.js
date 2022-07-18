import * as nodePath from 'path'

export const project = nodePath.basename(nodePath.resolve())
export const source = '#src'

export const paths = {
	build: {
		html: `${project}/`,
		php: `${project}/php/`,
		css: `${project}/css/`,
		scripts: `${project}/scripts/`,
		scriptModules: `${project}/scripts/modules/`,
		images: `${project}/img/`,
		fonts: `${project}/fonts/`,
	},
	scr: {
		html: [`${source}/**/*.html`, `!${source}/**/*.htm`],
		php: `${source}/php/*.php`,
		css: [`${source}/styles/**/*.sass`, `!${source}/styles/**/_*.sass`,
		`${source}/docs/*.sass`],
		scripts: `${source}/scripts/*.{ts,js}`,
		scriptModules: `${source}/scripts/modules/*.{ts,js}`,
		images: `${source}/img/**/*.{jpg,png,svg,gif,ico,webp,avif}`,
		fonts: `${source}/fonts/*.{ttf,otf,woff,woff2}`,
	},
	watch: {
		html: `${source}/**/*.{html,htm,php}`,
		css: `${source}/styles/**/*.sass`,
		php: `${source}/php/*.php`,
		demoCss: `${source}/docs/*.sass`,
		scripts: `${source}/scripts/*.{ts,js}`,
		scriptModules: `${source}/scripts/modules/*.{ts,js}`,
		images: `${source}/img/**/*.{jpg,png,svg,gif,ico,webp,avif}`,
	},
	clean: `./${project}/`,
}
export const fontsFIlePath = `${source}/styles/other/_fonts.sass`