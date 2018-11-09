// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),
  connect = require('gulp-connect'),
  deploy = require('gulp-gh-pages'),
  pug = require('gulp-pug'),
  watch = require('gulp-watch'),

  // folders
  folder = {
    src: 'src/'
  }
;

gulp.task('pug',function() {
 return gulp.src('src/index.pug')
 .pipe(pug({
    doctype: 'html',
    pretty: true
 }))
 .pipe(gulp.dest('src'));
});

gulp.task('watch', function () {
 return watch('src/html/index.pug', { ignoreInitial: false })
    .pipe(gulp.dest('pug'));
 });

//deploy to github pages
gulp.task('deploy', function () {
  return gulp.src("./src/**/*")
    .pipe(deploy())
});

// deploy to local server
gulp.task('webserver', function() {
  connect.server({
  	root: 'src',
    livereload: true
  });
})

// default task
gulp.task('default', ['webserver', 'pug']);