/*
* gulpfile.js
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var ghelper = require('gulp-helper');
ghelper.require();

var pkg = require('./package.json');
var config = require('./src/config.json');

gulp.task('default', ['concat', 'uglify']);

gulp.task('concat', function() {
  var scripts = config.files.map(function(f) {
    return './src/' + f;
  });

  return gulp.src(scripts)
    .pipe(concat('phina.js'))
    .pipe(replace('<%= version %>', pkg.version))
    .pipe(gulp.dest('./build/'))
    ;
});

gulp.task('uglify', ['concat'], function() {
  return gulp.src('./build/phina.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./build/'))
    .on('end', function() {
      util.log(util.colors.blue('finish'));
      gutil.beep();
    });
});

gulp.task('docs', shell.task([
  'jsduck ./src --output ./docs --title "phina.js docs"',
]));

/*
gulp.task('docs', function() {
  var command = 'jsduck ./src --output ./docs --title "tmlib.js docs" --eg-iframe=tm-iframe.html';

  gulp.src('./build/phina.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./build/'))
    .on('end', function() {
      util.log(util.colors.blue('finish'));
      gutil.beep();
    });
});

*/