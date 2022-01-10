const projectFolder = require('path').basename(__dirname);
const sourceFolder = '#src';

const paths = {
  build: {
    html: `${projectFolder}/`,
    css: `${projectFolder}/css/`,
    scripts: `${projectFolder}/scripts/`,
    scriptModules: `${projectFolder}/scripts/modules/`,
    images: `${projectFolder}/img/`,
    fonts: `${projectFolder}/fonts/`,
  },
  scr: {
    html: [`${sourceFolder}/*.html`, `!${sourceFolder}/*.htm`],
    css: [`${sourceFolder}/stylus/*.styl`, `!${sourceFolder}/stylus/_*.styl`],
    scripts: `${sourceFolder}/scripts/*.{ts,js}`,
    scriptModules: `${sourceFolder}/scripts/modules/*.{ts,js}`,
    images: `${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts: `${sourceFolder}/fonts/*`,
  },
  watch: {
    html: [`${sourceFolder}/**/*.html`, `${sourceFolder}/**/*.htm`],
    css: `${sourceFolder}/stylus/**/*.styl`,
    scripts: `${sourceFolder}/scripts/**/*.{ts,js}`,
    scriptModules: `${sourceFolder}/scripts/**/*.{ts,js}`,
    images: `${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
  },
  clean: `./${projectFolder}/`,
}
let fontsFIlePath = `${sourceFolder}/stylus/_fonts.styl`;

let { dest } = require('gulp'),
  gulp = require('gulp'),
  lp = require('gulp-load-plugins')(),
  fileinclude = require('gulp-file-include');
  fs = require('fs');

lp.browsersync = require('browser-sync').create();
lp.fileInclude = require('gulp-file-include');
lp.ts = require('gulp-typescript');
lp.del = require('del');
lp.stylus = require('gulp-stylus');
lp.autoprefixer = require('gulp-autoprefixer');
lp.groupMedia = require('gulp-group-css-media-queries');
lp.cleanCss = require('gulp-clean-css');
lp.rename = require('gulp-rename');
lp.terser = require('gulp-terser');
lp.imagemin = require('gulp-imagemin');
lp.ttf2woff2 = require('gulp-ttf2woff2');
lp.webpHTML = require('gulp-webp-html-fix');
lp.squoosh = require('gulp-libsquoosh');

function browserSync(params) {
  lp.browsersync.init({
    server: {
      baseDir: paths.clean,
    },
    port: 3000,
    notify: false,
  });
}
function html() {
  return gulp.src(paths.scr.html)
    .pipe(lp.fileInclude())
    .pipe(lp.webpHTML())
    .pipe(dest(paths.build.html))
    .pipe(lp.browsersync.stream());
}
function css() {
  return gulp.src(paths.scr.css)
    .pipe(lp.stylus({
      compress: true,
    }))
    .pipe(lp.groupMedia())
    .pipe(lp.autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
    }))
    //if you want to see not-minify css files
    .pipe(dest(paths.build.css))

    //save cleaning and renaming new css files
    .pipe(lp.cleanCss())
    .pipe(lp.rename({
      extname: '.min.css'
    }))
    .pipe(dest(paths.build.css))
    .pipe(lp.browsersync.stream());
}
function watchFIles() {
  gulp.watch(paths.watch.html, html);
  gulp.watch([paths.watch.css], css);
  gulp.watch([paths.watch.scripts], scripts);
  //? if you want work with .ts modules.
  // gulp.watch([paths.watch.scriptModules], scripts);
  gulp.watch([paths.watch.images], images);
}
function recreate() {
  return lp.del(paths.clean);
}
function scripts() {
  //? saving scripts files
  gulp.src(paths.scr.scripts)
    .pipe(fileinclude())
    .pipe(lp.ts({
      target: 'ES6',
      allowJs: true,
    }))

    .pipe(dest(paths.build.scripts))
    .pipe(lp.browsersync.stream());

  //? saving modules
  return gulp.src(paths.scr.scriptModules)
    .pipe(fileinclude())
    .pipe(lp.ts({
      target: 'ES6',
      allowJs: true,
    }))

    // minimizing. Delete if you want to see not-minify files.
    .pipe(lp.terser({
      ecma: 2016,
      safari10: true,
    }))
    .pipe(dest(paths.build.scriptModules))
    .pipe(lp.browsersync.stream());
}
function images() {
  return gulp.src(paths.scr.images)
    .pipe(lp.squoosh({
      webp: {},
    }))
    .pipe(dest(paths.build.images))
    .pipe(gulp.src(paths.scr.images))
    .pipe(lp.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3,
    }))
    .pipe(dest(paths.build.images))
    .pipe(lp.browsersync.stream());
}
function fonts() {
  return gulp.src(paths.scr.fonts)
    .pipe(lp.ttf2woff2({
      ignoreExt: true,
    }))
    .pipe(dest(paths.build.fonts));
}


function fontsStyle() {
  let file_content = fs.readFileSync(fontsFIlePath)
    .toString().replace(/\s/g, "");

  if (file_content == "") {
    fs.writeFile(fontsFIlePath, '', () => { });
    return fs.readdir(paths.build.fonts, (err, items) => {

      if (items) {
        for (var i = 0; i < items.length; i++) {
          let c_fontname;
          let fontFileName = items[i].split('.')[0];

          if (c_fontname !== fontFileName) {
            let fontFileNameLC = fontFileName.toLowerCase();
            let fontWeightName = fontFileNameLC.replace('italic', '').split('-')[1];

            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontWeightName ? fontWeightName : fontFileName;
            let fontStyle = fontFileNameLC.includes('italic') ? 'italic' : 'normal';

            fontWeight = getFontWeightFromString(fontWeight);
            fontName = concatFontWeightWithName(fontName, fontWeightName);

            fs.appendFile(fontsFIlePath,
              `fontStyle('${fontName}',${fontFileName}, '${fontWeight}', ${fontStyle});\r\n`,
              () => { });
          }
          c_fontname = fontFileName;
        }
      }
    })
  }
}
function concatFontWeightWithName(fontName, fontWeightName) {
  switch (fontWeightName) {
    case 'thin':
      return `${fontName}-thin`;
    case 'extralight':
      return `${fontName}-el`;
    case 'light':
      return `${fontName}-l`;
    case 'medium':
      return `${fontName}-med`;
    case 'semibold':
      return `${fontName}-sb`;
    case 'bold':
      return `${fontName}-b`;
    case 'extrabold':
    case 'ultrabold':
      return `${fontName}-eb`;
    case 'black':
    case 'heavy':
      return `${fontName}-bl`;

    default:
      return fontName;
  }
}
function getFontWeightFromString(filename) {
  switch (filename) {
    case 'thin':
      return '100';
    case 'extralight':
      return '200';
    case 'light':
      return '300';
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    case 'extrabold':
    case 'ultrabold':
      return '800';
    case 'black':
    case 'heavy':
      return '900';

    default:
      return '400';
  }
}

function setupSwiperJs() {
  if (fs.existsSync('node_modules/swiper/swiper-bundle.min.js')) {
    const modules = [
      'node_modules/swiper/swiper-bundle.min.js',
      'node_modules/swiper/swiper-bundle.min.js.map',
    ];
    return gulp.src(modules)
      .pipe(dest(paths.build.scripts));
  } else {
    return gulp.src(paths.scr.scripts);
  }
};
function setupSwiperCss() {
  if (fs.existsSync('node_modules/swiper/swiper-bundle.min.css')) {
    const swiperCss = [
      'node_modules/swiper/swiper-bundle.min.css',
    ];
    return gulp.src(swiperCss)
      .pipe(dest(paths.build.css));
  } else {
    return gulp.src(paths.scr.css);
  }
};


let build = gulp.series(recreate, setupSwiperCss, setupSwiperJs, gulp.parallel(scripts, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFIles, browserSync);

exports.build = build;
exports.watch = watch;
exports.default = watch;