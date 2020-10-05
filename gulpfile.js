
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    resolveDependencies = require('gulp-resolve-dependencies'),
    concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglify'),
    consolidate = require('gulp-consolidate'),
    iconfont = require('gulp-iconfont'),
    runSequence  = require('run-sequence'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),
    imageminMozjpeg = require('imagemin-mozjpeg'), //need to run 'brew install libpng'
    imageminGiflossy = require('imagemin-giflossy');


gulp.task('imagemin', function() {
    return gulp.src(['src/img/*.{gif,png,jpg}'])
        .pipe(cache(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: [0.95, 1] //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 90
            })
        ])))
        .pipe(gulp.dest('assets/images'));
});

gulp.task('js', function() {
    return gulp.src(['src/js/**/*.js'])
        .pipe(resolveDependencies({pattern: /\* @requires [\s-]*(.*\.js)/g}))
        .pipe(concat('main.js'))
        .pipe(uglifyjs())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(['src/scss/style.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']
        })]))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('default', function () {
    gulp.watch('src/scss/**/*.scss');
    gulp.watch('src/js/**/*.js');
    gulp.watch('src/img/*.{gif,png,jpg}');
});
