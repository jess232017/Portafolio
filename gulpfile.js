const gulp = require('gulp')
const svgSymbols = require('gulp-svg-symbols')

gulp.task(`sprites`, function() {
    return gulp
        .src(`img/svg/*.svg`)
        .pipe(svgSymbols())
        .pipe(gulp.dest(`img`))
})