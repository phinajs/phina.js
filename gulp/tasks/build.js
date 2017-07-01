var gulp    = require('gulp');
var header  = require('gulp-header');
var concat  = require('gulp-concat');
var replace = require('gulp-replace');
var config  = require('../config');

gulp.task('build', function() {
  return gulp.src(config.build.target)
    .pipe(concat('phina.js'))
    .pipe(replace('<%= version %>', config.package.version))
    .pipe(header(config.banner, {
      pkg: config.package,
    }))
    .pipe(gulp.dest(config.build.output))
    ;
});
