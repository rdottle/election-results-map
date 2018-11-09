// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),
  connect = require('gulp-connect'),
  deploy = require('gulp-gh-pages'),
  pug = require('gulp-pug'),
  watch = require('gulp-watch'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),

  // folders
  folder = {
    src: 'src/',
    dist: 'build/'
  }
;

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

gulp.task('pug',function() {
 return gulp.src('src/html/index.pug')
 .pipe(pug({
    doctype: 'html',
    pretty: true
 }))
 .pipe(gulp.dest('build/html'));
});

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('src/scss/index.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('build/css'))
});

//deploy to github pages
gulp.task('deploy', function () {
  return gulp.src("./build/**/*")
    .pipe(deploy())
});

// deploy to local server
gulp.task('webserver', function() {
  connect.server({
  	root: 'build',
    livereload: true
  });
})

// default task
gulp.task('default', ['webserver','styles', 'pug', 'scripts']);