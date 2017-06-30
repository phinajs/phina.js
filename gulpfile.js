/*
 * gulpfile.js
 */


var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp/tasks', {recurse: true});

var config = require('./gulp/config');

// watch
gulp.task('watch', function() {
  config.watch.target.forEach(function(task) {
    gulp.watch(config[task].target, [task]);
  });
});

// default tasks
gulp.task('default', ['build', 'uglify', 'watch']);
