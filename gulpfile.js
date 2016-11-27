const gulp          = require('gulp');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const cleanCSS      = require('gulp-clean-css');
const path =        require('path');
const swPrecache =  require('sw-precache');

const srcDir = 'src';
const destDir = 'static';
const publicDir = 'public';

// SCSS pipeline with autoprefixer and cleancss
gulp.task('scss', function() {
    gulp.src(srcDir + '/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(destDir + '/css'));
});

// CSS pipeline with autoprefixer and cleancss
gulp.task('css', function() {
    gulp.src(srcDir + '/css/**/*.css')
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(destDir + '/css'));
});

// JS pipeline with babel and uglify
gulp.task('js', () => {
    return gulp.src(srcDir + '/js/**/*.js')
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

// Generate Service Worker
// The service worker will automatically cache all site resources in the browser for offline use.
gulp.task('sw', function(callback) {
    swPrecache.write(path.join(destDir, 'service-worker.js'), {
        staticFileGlobs: ['public' + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
        verbose: true,
        stripPrefix: publicDir + '/',
    }, callback);
});

// Watch asset folder for changes
gulp.task('watch', ['scss','images','js','css'], function () {
    gulp.watch(srcDir + '/scss/**/*.scss', ['scss']);
    gulp.watch(srcDir + '/images/**/*', ['images']);
    gulp.watch(srcDir + '/js/**/*.js', ['js']);
    gulp.watch(srcDir + '/css/**/*.css', ['css']);
});

// Build assets
gulp.task('build', ['scss','css','images','js']);

gulp.task('default', ['build']);
