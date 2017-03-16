'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifycss = require('gulp-minify-css');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('test', function(){
   console.log('test');
});
gulp.task('browser-sync', ['styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: false
    });
});
gulp.task('styles', function () {
    return gulp.src('sass/*.sass')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(minifycss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});
gulp.task('watch', function () {
    gulp.watch('sass/*.sass', ['styles']);
    gulp.watch('app/js/*.js').on("change", browserSync.reload);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});
gulp.task('default', ['browser-sync', 'watch']);