const path = require('path');
const gulp = require('gulp');
const concatCss = require('gulp-concat-css');

const options = {
  includePaths: ['../../node_modules']
};

gulp.task('css', async function () {
  return await gulp
    .src('src/styles.css')
    .pipe(concatCss('/styles.css', options))
    .pipe(gulp.dest(path.join(__dirname, '.')));
});

gulp.task('build', gulp.series(['css']));
