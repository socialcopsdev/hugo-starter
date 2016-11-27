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
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');

const srcDir = 'src/';
const destDir = 'static/';
const publicDir = 'public/';
const swCachedFiletypesRegex = '**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'; 

// SCSS pipeline with autoprefixer and cleancss
gulp.task('scss', function() {
    gulp.src(srcDir + 'scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        // Need to re-init sourcemaps or else there are bugs
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        // need to re-init again
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // uggh why
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destDir + 'css'));
});

// CSS pipeline with autoprefixer and cleancss
gulp.task('css', function() {
    gulp.src(srcDir + 'css/**/*.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('libs.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destDir + 'css'));
});

// JS pipeline with babel and uglify
// First build libraries, then custom files
gulp.task('js', () => {
    return gulp.src([srcDir + 'js/vendor/*.js' , srcDir + 'js/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destDir + 'js'));
});

// Build js files for individual page behavior
gulp.task('jspages', () => {
    return gulp.src([srcDir + 'js/page/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destDir + 'js/page'));
});

// Optimize Images
gulp.task('images', () =>
    gulp.src(srcDir + 'images/**/*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(destDir + 'images'))
);

// Generate Service Worker
// The service worker will automatically cache all site resources in the browser for offline use.
gulp.task('sw', function(callback) {
    swPrecache.write(path.join(destDir, 'service-worker.js'), {
        staticFileGlobs: [publicDir + swCachedFiletypesRegex],
        verbose: true,
        stripPrefix: publicDir,
    }, callback);
});

// Copy the App Manifest to the static dir
gulp.task('manifest', () =>
    gulp.src(srcDir + 'manifest.json')
        .pipe(plumber())
        .pipe(gulp.dest(destDir))
);

// Watch asset folder for changes
gulp.task('watch', ['scss','css','images','js','jspages','manifest'], function () {
    gulp.watch(srcDir + 'scss/**/*.scss', ['scss']);
    gulp.watch(srcDir + 'images/**/*', ['images']);
    gulp.watch(srcDir + 'js/**/*.js', ['js','jspages']);
    gulp.watch(srcDir + 'css/**/*.css', ['css']);
    gulp.watch(srcDir + 'manifest.json', ['manifest']);
});

// Build assets
gulp.task('build', ['scss','css','images','js','jspages','manifest']);

gulp.task('default', ['build']);
