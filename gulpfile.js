var gulp            =           require('gulp'),
    sass            =           require('gulp-sass'),
    bs              =           require('browser-sync'),
    autoprefixer    =           require('gulp-autoprefixer');

gulp.task('make-sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(bs.reload({stream: true}))
});

gulp.task('browser-reload', function() {
    bs({
        server:{
            baseDir: 'app'
        },
        notify: false
    })
})

gulp.task('watch', ['browser-reload', 'make-sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['make-sass']);
    gulp.watch('src/scss/**/*.css', ['make-sass']);
    gulp.watch('app/*.html', bs.reload);
    // gulp.watch('app/js/*.js', bs.reload);
});

gulp.task('default', ['watch']);
