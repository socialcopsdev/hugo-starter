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

const rootDir = 'static';

// Compile SCSS files to CSS
gulp.task('scss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(rootDir + '/css'));
});

// CSS libraries
gulp.task('css_libs', function() {
    let cssLibs = [
        'node_modules/normalize.css/normalize.css'
    ];

    gulp.src(cssLibs)
        .pipe(autoprefixer({
            browsers : ['last 20 versions']
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(rootDir + '/css'));
});

// JS pipeline
gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(rootDir + '/js'));
});


// JS libraries
gulp.task('js_libs', () => {
    let jsLibs = [
        'node_modules/jquery/dist/jquery.min.js',
        'src/js/vendor/*.js'
    ];

    return gulp.src(jsLibs)
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest(rootDir + '/js'));
});

// Optimize Images
gulp.task('images', () =>
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(rootDir + '/images'))
);

// Generate Service Worker
gulp.task('sw', function(callback) {
    swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}', rootDir + '/offline.html'],
        stripPrefix: rootDir,
        importScripts: ['sw/util.js'],
        runtimeCaching: [
            {
                urlPattern: /\/*.html/,
                handler: 'fastest'
            },
            {
                urlPattern: /\/post\//,
                handler: 'fastest',
                options: {
                    cache: {
                        maxEntries: 10,
                        name: 'post-cache'
                    }
                }
            }
        ]
    }, callback);
});

// Watch asset folder for changes
gulp.task('watch', ['scss','images','js','sw'], function () {
    gulp.watch('src/scss/*.scss', ['scss','sw']);
    gulp.watch('src/images/*', ['images','sw']);
    gulp.watch('src/js/*', ['js','sw']);
});

gulp.task('default', ['js_libs','css_libs','sw','watch']);
