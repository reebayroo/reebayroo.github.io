const sass = require('gulp-sass')(require('sass'));
var data = require('gulp-data');
var gulp          = require('gulp');
const fs = require('fs');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

// var resume = require('./data/full-resume.json')
var pug = require('gulp-pug');
var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

function sassTask() {
  return gulp.src('scss/app.scss')
    .pipe(sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', sass.logError))
    .pipe($.postcss([
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
};

function compilePug() {
  return src('./src/*.pug')
    .pipe(data((file) => require('./src/data.json')))
    .pipe(pug({ pretty: true }))
    .pipe(dest('./dist'));
}

function buildHTML() {
  var dataFile = './data/full-resume.json';

  return gulp.src('./views/*.pug')
  .pipe(data((file) => JSON.parse(fs.readFileSync(dataFile))))
  .pipe(pug({pretty: true }))
  .pipe(gulp.dest('.'))

}

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("scss/*.scss", sass);
  gulp.watch("views/*.pug", buildHTML);
  gulp.watch("data/*.json", buildHTML);
  gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('views', buildHTML);
gulp.task('sass', sassTask);
gulp.task('serve', gulp.series('sass', serve));
gulp.task('default', gulp.series('sass', 'views', serve));
