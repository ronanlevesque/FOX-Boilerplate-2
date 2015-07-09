// Plugins

import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import gulpLoadPlugins from 'gulp-load-plugins';

const $$ = gulpLoadPlugins();

// Server & Livereload

gulp.task('connect', () => {
  const connect = require('connect');
  const serveStatic = require('serve-static');
  const serveIndex = require('serve-index');

  const app = connect()
  .use(require('connect-livereload')({ port: 35729 }))
  .use(serveStatic('./'))
  .use(serveIndex('./'));

  require('http').createServer(app)
  .listen(8000);
});

// Handle CLI errors

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Folders

const baseFolder = {
  dev  : 'dev/',
  dist : 'assets/'
};

const devFolder = {
  sass  : baseFolder.dev + 'sass/',
  js : baseFolder.dev + 'js/',
  img  : baseFolder.dev + 'img/'
};

const distFolder = {
  css  : baseFolder.dist + 'css/',
  js : baseFolder.dist + 'js/',
  img  : baseFolder.dist + 'img/'
};

// Styles

gulp.task('styles', () => {
  return gulp.src(devFolder.sass + '**/*.scss')
  .pipe($$.sass())
  .on('error', $$.notify.onError("Error: <%= error.message %>"))
  .on('error', handleError)
  .pipe($$.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest(distFolder.css))
  .pipe($$.minifyCss())
  .pipe(gulp.dest(distFolder.css));
});

// Scripts

gulp.task('scripts', () => {
  let b = browserify({
    entries: devFolder.js + 'main.js',
    debug: true
  })
  .transform(babelify)

  return b.bundle()
  .on('error', $$.notify.onError("Error: <%= error.message %>"))
  .on('error', handleError)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe($$.sourcemaps.init({loadMaps: true}))
  .pipe($$.uglify())
  .pipe($$.sourcemaps.write('./'))
  .pipe(gulp.dest(distFolder.js));
});

// Images

gulp.task('images', () => {
  return gulp.src(devFolder.img + '**/*')
  .pipe($$.imagemin())
  .pipe(gulp.dest(distFolder.img))
});

// Watch

gulp.task('watch', () => {

  $$.livereload.listen();

  gulp.watch([
    distFolder.css + '**/*.css',
    distFolder.js + '**/*.js',
    baseFolder + '**/*.html',
    distFolder.img + '**/*.jpg',
    distFolder.img + '**/*.png',
    distFolder.img + '**/*.svg'
  ]).on('change', $$.livereload.changed);

  gulp.watch(devFolder.sass + '**/*.scss', ['styles']);
  gulp.watch(devFolder.js + '**/*.js', ['scripts']);
  gulp.watch([devFolder.img + '**/*.jpg', devFolder.img + '**/*.png', devFolder.img + '**/*.svg'], ['images']);
});

// Testing tasks

gulp.task('csslint', () => {
  return gulp.src(distFolder.css + '**/*.css')
  .pipe($$.csslint())
  .pipe($$.csslint.reporter('default'))
});

gulp.task('htmlhint', () => {
  return gulp.src(baseFolder + '**/*.html')
  .pipe($$.htmlhint())
  .pipe($$.htmlhint.reporter('default'))
});

gulp.task('jshint', () => {
  return gulp.src(devFolder.js + '**/*.js')
  .pipe($$.jshint({
    browser: true,
    curly: true,
    eqeqeq: true,
    eqnull: true,
    latedef: true,
    noarg: true,
    undef: true,
    unused: true
  }))
  .pipe($$.jshint.reporter('default'))
});

// Run tasks

gulp.task('default', ['styles', 'scripts', 'images', 'connect', 'watch']);
gulp.task('test', ['csslint', 'htmlhint', 'jshint']);
