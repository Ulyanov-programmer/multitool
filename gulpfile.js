const fileinclude = require('gulp-file-include');

const projectFolder = require('path').basename(__dirname);
const sourceFolder = '#src';

let paths = {
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
    css: [`${sourceFolder}/sass/*.sass`, `!${sourceFolder}/sass/_*.sass`],
    scripts: `${sourceFolder}/scripts/*.js`,
    scriptModules: `${sourceFolder}/scripts/modules/*.mjs`,
    images: `${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts: `${sourceFolder}/fonts/*`,
  },
  watch: {
    html: [`${sourceFolder}/**/*.html`, `${sourceFolder}/**/*.htm`],
    css: `${sourceFolder}/sass/**/*.sass`,
    scripts: `${sourceFolder}/scripts/**/*.js`,
    scriptModules: `${sourceFolder}/scripts/**/*.mjs`,
    images: `${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
  },
  clean: `./${projectFolder}/`,
}
let fontsFIlePath = `${sourceFolder}/sass/_fonts.sass`;

let { scr, dest, src } = require('gulp'),
  gulp = require('gulp'),
  lp = require('gulp-load-plugins')();

lp.browsersync = require('browser-sync').create();
lp.fileInclude = require('gulp-file-include');
lp.del = require('del');
lp.gulpSass = require('gulp-sass');
lp.autoprefixer = require('gulp-autoprefixer');
lp.groupMedia = require('gulp-group-css-media-queries');
lp.cleanCss = require('gulp-clean-css');
lp.rename = require('gulp-rename');
lp.cleanJs = require('gulp-uglify-es').default;
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
    .pipe(lp.gulpSass({
      outputStyle: 'expanded',
    }))
    .pipe(lp.groupMedia())
    .pipe(lp.autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
    }))
    //save css files
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
  gulp.watch([paths.watch.scriptModules], scripts);
  gulp.watch([paths.watch.images], images);
}
function clean() {
  return lp.del(paths.clean);
}
function scripts() {
  //? save .js files
  gulp.src(paths.scr.scripts)
    .pipe(fileinclude())

    .pipe(dest(paths.build.scripts))
    .pipe(lp.browsersync.stream());

  //? save .mjs modules
  return gulp.src(paths.scr.scriptModules)
    .pipe(fileinclude())

    //save modules
    .pipe(dest(paths.build.scriptModules))

    //save minimize and renaming new .mjs files
    .pipe(lp.cleanJs())
    .pipe(lp.rename({
      extname: '.min.mjs'
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

let fs = require('fs');
function fontsStyle() {
  let file_content = fs.readFileSync(fontsFIlePath)
    .toString().replace(/\s/g, "");

  if (file_content == "") {
    fs.writeFile(fontsFIlePath, '', () => { });
    return fs.readdir(paths.build.fonts, (err, items) => {

      if (items) {
        let c_fontname;

        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];

          if (c_fontname != fontname) {
            fs.appendFile(fontsFIlePath, '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', () => { });
          }
          c_fontname = fontname;
        }
      }
    })
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


let build = gulp.series(clean, setupSwiperCss, setupSwiperJs, gulp.parallel(scripts, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFIles, browserSync);

exports.build = build;
exports.watch = watch;
exports.default = watch;