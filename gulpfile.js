//'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


sass.compiler = require('node-sass');

//Compile our scss to css
function style() {
  //Find our scss file
  return gulp.src('./src/scss/**/*.scss')
  //Pass that through our sass copiler and then compile in css
  .pipe(sass())
  .pipe(gulp.dest('./src/css'))
  // Adding our stream changes for all browsers
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
