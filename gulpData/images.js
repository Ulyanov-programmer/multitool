import squoosh from 'gulp-libsquoosh';
import imagemin from 'gulp-imagemin';

export function images() {
  return gulp.src(paths.scr.images)
    .pipe(squoosh({
      webp: {},
      avif: {},
    }))
    .pipe(gulp.dest(paths.build.images))
    .pipe(gulp.src(paths.scr.images))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3,
    }))
    .pipe(gulp.dest(paths.build.images))
    .pipe(browsersync.stream());
}