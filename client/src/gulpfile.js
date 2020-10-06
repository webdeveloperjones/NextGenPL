let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer')

const paths = {
    scss: {
        src: './scss/style.scss',
        dest: './css',
        watch: './scss/**/*.scss',
    }
}

const styles = () => {
    return gulp.src([paths.scss.src])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scss.dest))
}

const watch = () => {
    gulp.watch([paths.scss.watch], styles)
}
const build = gulp.series(styles, gulp.parallel(watch))

exports.styles = styles

exports.default = build