var gulp = require('gulp');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');

var devCSS = 'dev/css/';

gulp.task('cssPack', function() {
    var sassFiles,
        cssFiles;

    sassFiles = gulp.src(devCSS + '*.scss')
        .pipe(sass());

    cssFiles = gulp.src(devCSS + '*.css');

    return merge(sassFiles, cssFiles)
           .pipe(concat('style.css'))
           .pipe(prefix())
           .pipe(clean({level: {1: {specialComments: 0}}}))
           .pipe(gulp.dest("public/assets"));
});

gulp.task('default', ['cssPack'], function() {
    gulp.watch(devCSS + '*.css', ['cssPack']);
    gulp.watch(devCSS + '*.scss', ['cssPack']);
})