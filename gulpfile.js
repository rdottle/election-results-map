// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),
  connect = require('gulp-connect'),
  deploy = require('gulp-gh-pages'),

  // folders
  folder = {
    src: 'src/'
  }
;

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
gulp.task('default', ['webserver']);