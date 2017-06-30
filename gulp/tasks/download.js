// なんかダウンロードするときに使えそう

var gulp      = require('gulp');
var download  = require('gulp-download');

gulp.task('download', function() {
  download('http://tmlife.net')
    .pipe(gulp.dest('downloads/'));
});
