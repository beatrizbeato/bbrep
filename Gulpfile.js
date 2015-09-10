var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var del = require('del');
var fileinclude = require("gulp-file-include");

function swallowError(error) {
  console.error(error.toString());
}

gulp.task('browser-sync', function() {
  var config = {
    server: {
      baseDir: "./dist",
    },

    ghostMode: {
      clicks: true,
      location: true,
      forms: true,
      scroll: true
    }
  }

  if (process.env.TUNNEL === 'true') {
    config.tunnel = "whitesmithco";
  }

  browserSync(config);
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('scss', function () {
  return sass('./stylesheets/scss/main.scss')
    .pipe(plumber(swallowError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ basename: 'styles' }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
});

/*
 * Currently assuming the vendor CSS files are minimized versions.
 * Be careful when uncommenting the minification part.
 */
gulp.task('vendor-css', function () {
  return gulp.src('./stylesheets/vendor/*.css')
    .pipe(plumber(swallowError))
    // .pipe(minifycss())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }))
});

gulp.task('scripts', function() {
  return gulp.src('./javascripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

/*
 * Currently assuming the vendor scripts are minimized versions.
 * Be careful when uncommenting the minification part.
 */
gulp.task('vendor-scripts', function() {
  return gulp.src('./javascripts/vendor/**/*.js')
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/js'))
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(uglify())
    // .pipe(gulp.dest('./dist/js'));
});

gulp.task('assets', function () {
  return gulp.src('./assets/**', { base: './assets/' })
    .pipe(plumber(swallowError))
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('html', function () {
  return gulp.src('./html/**.html')
    .pipe(plumber(swallowError))
    .pipe(fileinclude({ prefix: '@@' }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('clean', function (cb) {
  del(['./dist'], cb)
});

gulp.task('default', ['clean'], function () {
  gulp.start.apply(gulp, [
    'browser-sync',
    'assets',
    'vendor-css',
    'vendor-scripts',
    'scripts',
    'scss',
    'html'
  ]);

  gulp.watch('./assets/**/*', ['assets', 'bs-reload']);
  gulp.watch('./html/**/*.html', ['html', 'bs-reload']);

  gulp.watch('./stylesheets/scss/**/*.scss', ['scss']);
  gulp.watch('./javascripts/*.js', ['scripts', 'bs-reload'])

  gulp.watch('./stylesheets/vendor/*.css', ['css']);
  gulp.watch('./javascripts/vendor/**/*.js', ['vendor-scripts', 'bs-reload'])
});
