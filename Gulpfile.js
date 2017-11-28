var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var runsequence = require('run-sequence');
var browserify = require('browserify');
var fs = require('fs');
var babel = require('gulp-babel');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('js', function () {
  return gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.js',
      './assets/js/nav/asideNav.js'
  ])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./assets/js'));
});

gulp.task('sass', function () {
  return gulp.src([
    './assets/scss/main.scss'
    //    another sccs files to compile
  ])
      .pipe(sass().on('error', sass.logError))
      .pipe(csso())
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./assets/css'));
});

gulp.task('img', function () {
  return gulp.src([
    './assets/img/*.+(png|jpg|gif|svg|jpeg)'
  ])
      .pipe(gulp.dest('./assets/img'));
});

gulp.task('watch', function () {
  var onChange = function (event) {
    console.log('File ' + event.path + ' has been ' + event.type);
  };
  // Watch Sass files
  gulp.watch([
    './assets/scss/*.scss',
    './assets/scss/components/**/*.scss'
  ], ['sass']).on('change', onChange);
  // another files to watch
  gulp.watch([
      './assets/js/*.js',
      './assets/js/nav/*.js'
  ], ['js']).on('change', onChange);
  gulp.watch([
    '.assets/img/.+(png|jpg|gif|svg|jpeg)'
  ], ['img']).on('change', onChange);
});

gulp.task('build', function (callback) {
  runsequence('sass', 'img', 'js', callback)
});