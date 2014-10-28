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
    notify = require('gulp-notify');

// Server

gulp.task('connect', function() {
  connect.server({
    root: 'dev',
    port: 1337,
    livereload: true
  });
});

// Handle CLI errors

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Folders

var baseFolder = {
  dev  : './dev/',
  dist : './dist/'
};

var devFolder = {
  css  : baseFolder.dev + 'css/',
  js : baseFolder.dev + 'js/',
  img  : baseFolder.dev + 'img/'
};

var distFolder = {
  css  : baseFolder.dist + 'css/',
  js : baseFolder.dist + 'js/',
  img  : baseFolder.dist + 'img/'
};

// Dev tasks

gulp.task('sass', function() {
  return gulp.src([devFolder.css + 'sass/**/*.scss'])
  .pipe(sass())
  .on('error', notify.onError("Error: <%= error.message %>"))
  .on('error', handleError)
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest(devFolder.css))
});

gulp.task('html', function () {
  return gulp.src(baseFolder.dev + '**/*.html')
  .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src(devFolder.css + '**/*.css')
  .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src([devFolder.js + '**/*.js', '!' + devFolder.js + 'ie/*.js', '!' + devFolder.js + '**/main.js'])
  .pipe(concat('main.js'))
  .pipe(gulp.dest(devFolder.js))
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(devFolder.css + '**/*.scss', ['sass']);
  gulp.watch(devFolder.css + '**/*.css', ['css']);
  gulp.watch(devFolder.js + '**/*.js', ['scripts']);
  gulp.watch(baseFolder.dev + '**/*.html', ['htmlreload']);
});

// Testing tasks

gulp.task('csslint', function() {
  return gulp.src(devFolder.css + '**/*.css')
  .pipe(csslint())
  .pipe(csslint.reporter('default'))
});

gulp.task('htmlhint', function() {
  return gulp.src(baseFolder.dev + '**/*.html')
  .pipe(htmlhint())
  .pipe(htmlhint.reporter('default'))
});

gulp.task('jshint', function() {
  return gulp.src(devFolder.js + '**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
});

// Deploy tasks

gulp.task('minify', function() {
  return gulp.src(devFolder.css + '**/*.css')
  .pipe(minify())
  .pipe(gulp.dest(distFolder.css))
});

gulp.task('uglify', function() {
  return gulp.src(devFolder.js + 'main.js')
  .pipe(uglify())
  .pipe(gulp.dest(distFolder.js))
});

gulp.task('img', function() {
  return gulp.src(devFolder.img + '**/*')
  .pipe(imagemin())
  .pipe(gulp.dest(distFolder.img))
});

gulp.task('svg', function () {
  return gulp.src(devFolder.img + '**/*.svg')
  .pipe(svgmin())
  .pipe(svg2png())
  .pipe(gulp.dest(distFolder.img));
});

gulp.task('copy', function () {
  return gulp.src([baseFolder.dev + '*.html', './dev/**/*.php'])
  .pipe(gulp.dest(baseFolder.dist));
});

// Msg tasks

gulp.task('servermsg', function () {
  return gulp.src(baseFolder.dev)
  .pipe(notify({
    title: '[TASK] -- Local server',
    message: 'Local server created at localhost:1337.'
  }));
});

gulp.task('testmsg', function () {
  return gulp.src(baseFolder.dev)
  .pipe(notify({
    title: '[TASK] -- Testing files',
    message: 'Tests run on your CSS, HTML and JS files. See console for more details.'
  }));
});

gulp.task('deploymsg', function () {
  return gulp.src(baseFolder.dev)
  .pipe(notify({
    title: '[TASK] -- Deploy',
    message: 'Files successfully deployed under /dist.'
  }));
});

// Run tasks

gulp.task('default', ['connect', 'servermsg', 'watch']);
gulp.task('test', ['csslint', 'htmlhint', 'jshint', 'testmsg']);
gulp.task('deploy', ['minify', 'uglify', 'img', 'svg', 'copy', 'deploymsg']);
