// Plugins

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    svg2png = require('gulp-svg2png'),
    svgmin = require('gulp-svgmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    growl = require('gulp-notify-growl');

// Server & Notifications

gulp.task('connect', function() {
  connect.server({
    root: 'dev',
    port: 1337,
    livereload: true
  });
});

var growlNotifier = growl();

// Handle CLI errors

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Dev tasks

gulp.task('sass', function() {
  return gulp.src(['./dev/css/sass/**/*.scss', '!./dev/css/sass/**/_*.scss'])
  .pipe(sass())
  .on('error', handleError)
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('./dev/css'))
  .pipe(growlNotifier({
    title: '[TASK] -- Sass',
    message: 'Your SCSS files have been correctly compiled.'
  }));
});

gulp.task('htmlreload', function () {
  return gulp.src('./dev/*.html')
  .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(['./dev/js/**/*.js', '!./dev/js/ie/*.js', '!./dev/js/**/main.js'])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./dev/js'))
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./dev/css/**/*.scss', ['sass']);
  gulp.watch('./dev/**/*.html', ['htmlreload']);
  gulp.watch('./dev/css/**/*.css', ['htmlreload']);
  gulp.watch('./dev/js/**/*.js', ['scripts']);
});

// Testing tasks

gulp.task('css', function() {
  return gulp.src('./dev/css/**/*.css')
  .pipe(csslint())
  .pipe(csslint.reporter('default'))
});

gulp.task('html', function() {
  return gulp.src('./dev/**/*.html')
  .pipe(htmlhint())
  .pipe(htmlhint.reporter('default'))
});

gulp.task('lint', function() {
  return gulp.src('./dev/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
});

// Deploy tasks

gulp.task('minify', function() {
  return gulp.src('./dev/css/**/*.css')
  .pipe(minify())
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('uglify', function() {
  return gulp.src('./dev/js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
});

gulp.task('img', function() {
  return gulp.src('./dev/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/img'))
});

gulp.task('svg', function () {
  return gulp.src('./dev/img/**/*.svg')
  .pipe(svgmin())
  .pipe(svg2png())
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy', function () {
  return gulp.src(['./dev/**/*.html', './dev/**/*.php'])
  .pipe(gulp.dest('./dist'));
});

// Msg tasks

gulp.task('servermsg', function () {
  return gulp.src('./dev')
  .pipe(growlNotifier({
    title: '[TASK] -- Local server',
    message: 'Local server created at localhost:1337.'
  }));
});

gulp.task('testmsg', function () {
  return gulp.src('./dev')
  .pipe(growlNotifier({
    title: '[TASK] -- Testing files',
    message: 'Tests run on your CSS, HTML and JS files. See console for more details.'
  }));
});

gulp.task('deploymsg', function () {
  return gulp.src('./dev')
  .pipe(growlNotifier({
    title: '[TASK] -- Deploy',
    message: 'Files successfully deployed under /dist.'
  }));
});

// Run tasks

gulp.task('default', ['connect', 'servermsg', 'watch']);
gulp.task('test', ['css', 'html', 'lint', 'testmsg']);
gulp.task('deploy', ['minify', 'uglify', 'img', 'svg', 'copy', 'deploymsg']);