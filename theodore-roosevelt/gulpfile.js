// * For Modern Browsers Optimizations ONLY
/* Designed for Single Page Apps */
const {src, dest, watch, series, parallel} = require('gulp');
const htmlmin = require('gulp-html-minifier'),
      sass = require('gulp-dart-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cleancss = require('clean-css'),
      babel = require('gulp-babel'),
      terser = require('gulp-terser'),
      imagemin = require('gulp-imagemin'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      browserSync = require('browser-sync').create();

// =========
// Checklist
// =========
// Image Optimization
// Copy & Rename Files
// Uglify (minify) CSS
// Cache Busting
// Copy HTML
// Minify HTML (if possible)
// Concatenate & Uglify CSS / JS

// =====
// Paths
// =====
const paths = {
    styles: {
        sassSRC: "./src/styles/sass/**/*.sass",
        sassDEST: "./src/styles/css/",
        cssSRC: "./src/css/*.css",
        cssDEST: "./dist/"
    },
    scripts: {
        jsSRC: "./src/**/*.js",
        jsDEST: "./dist/js/"
    },
    images: {
        faviconSRC: "./src/favicon.ico",
        faviconDEST: "./dist/favicon.ico",
        bases: "./images/**/*"
    },
    fonts: {
        fontSRC: "./src/fonts/",
        fontDEST: "./dist/fonts"
    }
};

// =====================
// PRE-DEVELOPMENT STAGE
// =====================
/*
- Copy files
- Miniffy files
- Optimize Files
*/

// Copy HTML file and minify to 'dist' folder
function copyHtml() {
    return src('./src/*.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
        .pipe(dest('./dist/'));
}

// Copy Minify PNG, JPEG, GIF and SVG with 'imagemin'
function copyAndMinifyImages() {
    // ? Don't know how to use ending *.{png, jpg, jpeg, gif, svg}
    return src('./src/images/*')
        .pipe(imagemin())
        .pipe(dest('./dist/images/'));
}

// Copy favicon over to DIST repo
function copyFavicon() {
    return src('./src/favicon.ico')
        .pipe(dest('./dist/'));
}

// Copy fonts over to DIST repo
function copyFonts() {
    // ? Don't know how to use ending *.{woff, woff2, ttf, eot, svg}
    return src('./src/fonts/**/*')
        .pipe(dest('./dist/fonts/'));
}

// =================
// DEVELOPMENT STAGE
// =================

// Compile sass into css with post-css
function compileSassToCss() {
    // 1. Locate sass file.
    // 2. Initialise sourcemaps
    // 3. Pass the file through sass compiler.
    // 4. Pass the file through PostCSS plugins
        // Add Autoprefixer
    // 5. Choose a directory to save the compiled CSS.
    // 6. Stream changes to all browser.
    const plugins = [
        autoprefixer({ overrideBrowserslist: ['last 2 chrome version', 'last 2 firefox version', 'last 2 safari version', '> 5%'], grid: true })
    ];

    return src('./src/styles/sass/**/*.sass')
        .pipe(sourcemaps.init({
            // loadMaps: true,
            largeFile: true
        }))
        .pipe(sass({
                outputStyle: 'expanded',
                cascade: false
            }))
            .on('error', sass.logError)
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write())
        .pipe(dest('./src/'))
        .pipe(browserSync.stream());
}

function transpileJs() {
    // transpile into pre-ES6
    // concat into one file 'main.js'
    return src(paths.scripts.jsSRC)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('./src/'))
        .pipe(browserSync.stream());
}

// ================
// PRODUCTION STAGE
// ================
// ? Rename 'style.css' to 'style.min.css'

function concatCSS() {
    return src('./src/*.css')
    .pipe(sourcemaps.init({
        // loadMaps: true,
        largeFile: true
    }))
    .pipe(cleancss())
    // .pipe(sourcemaps.write('./maps/'))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/'));
}

function minifyJS() {
    return src('./src/main.js')
    .pipe(terser())
    .pipe(dest(paths.scripts.jsDEST));
}

// ===========
// WATCH FILES
// ===========

function watchDevFiles() {
    browserSync.init({
        server: {
            baseDir: './src/',
            index: 'index.html'
        }
    });

    // Run function when any sass file changes
    watch('./src/styles/sass/**/*.sass', compileSassToCss);
    watch(paths.scripts.jsSRC, transpileJs);
    // watch(paths.scripts.jsSR).on('change', browserSync.reload); // ? Test if it works this way as well
    watch('src/*.html').on('change', browserSync.reload);
}

// EXPORTS

// PRE-DEVELOPMENT STAGE
exports.copyHtml = copyHtml;
exports.copyAndMinifyImages = copyAndMinifyImages;
exports.copyFavicon = copyFavicon;
exports.copyFonts = copyFonts;

exports.predev = parallel(copyHtml, copyAndMinifyImages, copyFavicon, copyFonts);

// DEVELOPMENT STAGE
exports.compileSassToCss = compileSassToCss;
exports.transpileJs = transpileJs;

// WATCH FILES
exports.watchDevFiles= watchDevFiles;
exports.dev = series(parallel(compileSassToCss, transpileJs), watchDevFiles);

// PRODUCTION STAGE
exports.concatCSS = concatCSS;
exports.minifyJS = minifyJS;

exports.prod = parallel(concatCSS, minifyJS);