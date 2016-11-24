const gulp          = require('gulp');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const cleanCSS      = require('gulp-clean-css');

const srcDir = 'src';
const destDir = 'static';

// SCSS pipeline with autoprefixer and cleancss
gulp.task('scss', function() {
    gulp.src(srcDir + '/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(destDir + '/css'));
});

// JS pipeline with babel and uglify
gulp.task('js', () => {
    return gulp.src(srcDir + '/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir + '/js'));
});

// Optimize Images
gulp.task('images', () =>
    gulp.src(srcDir + '/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(destDir + '/images'))
);


// Watch asset folder for changes
gulp.task('watch', ['scss','images','js'], function () {
    gulp.watch(srcDir + '/scss/*.scss', ['scss']);
    gulp.watch(srcDir + '/images/*', ['images']);
    gulp.watch(srcDir + '/js/*', ['js']);
});

// Build assets
gulp.task('build', ['scss','images','js']);

gulp.task('default', ['build']);
