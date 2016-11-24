const gulp          = require('gulp');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const cleanCSS      = require('gulp-clean-css');

const rootDir = 'static';

// SCSS pipeline with autoprefixer and cleancss
gulp.task('scss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(rootDir + '/css'));
});

// JS pipeline with babel and uglify
gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(rootDir + '/js'));
});

// Optimize Images
gulp.task('images', () =>
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(rootDir + '/images'))
);


// Watch asset folder for changes
gulp.task('watch', ['scss','images','js'], function () {
    gulp.watch('src/scss/*.scss', ['scss']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch('src/js/*', ['js']);
});

gulp.task('default', ['watch']);
