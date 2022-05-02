import * as nodePath from 'path';

export const projectFolderName = nodePath.basename(nodePath.resolve())
export const sourceFolderName = '#src';

export const paths = {
	build: {
		html: `${projectFolderName}/`,
		css: `${projectFolderName}/css/`,
		scripts: `${projectFolderName}/scripts/`,
		scriptModules: `${projectFolderName}/scripts/modules/`,
		images: `${projectFolderName}/img/`,
		fonts: `${projectFolderName}/fonts/`,
	},
	scr: {
		html: [`${sourceFolderName}/**/*.html`, `!${sourceFolderName}/**/*.htm}`],
		css: [`${sourceFolderName}/styles/**/*.styl`, `!${sourceFolderName}/styles/**/_*.styl`,
		`${sourceFolderName}/docs/*.styl`],
		scripts: `${sourceFolderName}/scripts/*.{ts,js}`,
		scriptModules: `${sourceFolderName}/scripts/modules/*.{ts,js}`,
		images: `${sourceFolderName}/img/**/*.{jpg,png,svg,gif,ico,webp,avif}`,
		fonts: `${sourceFolderName}/fonts/*.{ttf,otf,woff,woff2}`,
	},
	watch: {
		html: `${sourceFolderName}/**/*.{html,htm}`,
		css: `${sourceFolderName}/styles/**/*.styl`,
		demoCss: `${sourceFolderName}/docs/*.styl`,
		scripts: `${sourceFolderName}/scripts/*.{ts,js}`,
		scriptModules: `${sourceFolderName}/scripts/modules/*.{ts,js}`,
		images: `${sourceFolderName}/img/**/*.{jpg,png,svg,gif,ico,webp,avif}`,
	},
	clean: `./${projectFolderName}/`,
}
export let fontsFIlePath = `${sourceFolderName}/styles/other/_fonts.styl`;