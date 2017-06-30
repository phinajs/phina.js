var gulp    = require('gulp');
var shell   = require('gulp-shell');


gulp.task('docs', shell.task([
  'jsduck ./src --output ./docs --title "phina.js docs"',
]));
