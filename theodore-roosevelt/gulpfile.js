// * For Modern Browsers Optimizations ONLY
/* Designed for Single Page Apps */
const { src, dest, watch, series, parallel } = require('gulp');
const htmlmin = require('gulp-html-minifier'),
    sass = require('gulp-dart-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cleancss = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    terser = require('gulp-terser'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    del = require('del'),
    rename = require('rename'),
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
        jsSRC: "./src/scripts/**/*.js",
        jsDEST: "./dist/js/",
        jsServiceWorker: "./sw.js"
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

const scriptWatchFiles = [
    'src/scripts/animations/*.js',
    'src/scripts/modules/*.js'
];

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

// Copy Service Worker script to DIST repo
function copyServiceWorker() {
    return src('./src/sw.js')
        .pipe(dest('./dist/'));
}

// Copy Manifest file to DIST repo
function copyManifest() {
    return src('./src/manifest.webmanifest')
        .pipe(dest('./dist/'));
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
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('./src/'))
        .pipe(browserSync.stream());
}

// function cleanSrcFiles() {
//     return del(['./src/main.js', './src/style.css']);
// }

// function cleanJs() {
//     return del(['./src/main.js']);
// }

// function cleanCss() {
//     return del(['./src/style.css']);
// }
// ================
// PRODUCTION STAGE
// ================
// ? Rename 'style.css' to 'style.min.css'

function concatCSS() {
    return src('./src/style.css')
        .pipe(cleancss({compatibility: 'ie11'}))
        .pipe(dest('./dist/'));
        // .pipe(cleancss({compatibility: 'ie11'}))
        // .pipe(sourcemaps.init({
        //     // loadMaps: true,
        //     largeFile: true
        // }))
            // .pipe(sourcemaps.write('./maps/'))
        // .pipe(sourcemaps.write())
}

function minifyJS() {
    return src('./src/script.js')
        .pipe(terser())
        .pipe(dest('./dist/'));
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
    watch(scriptWatchFiles, transpileJs);
    watch('src/*.html').on('change', browserSync.reload);
    // watch(paths.scripts.jsSR).on('change', browserSync.reload); // ? Test if it works this way as well
}

// EXPORTS

// PRE-DEVELOPMENT STAGE
exports.copyHtml = copyHtml;
exports.copyAndMinifyImages = copyAndMinifyImages;
exports.copyFavicon = copyFavicon;
exports.copyFonts = copyFonts;

exports.predev = parallel(copyHtml, copyAndMinifyImages, copyFavicon, copyFonts,copyServiceWorker, copyManifest);

// DEVELOPMENT STAGE
exports.compileSassToCss = compileSassToCss;
exports.transpileJs = transpileJs;

// WATCH FILES
exports.watchDevFiles = watchDevFiles;
exports.dev = series(parallel(compileSassToCss, transpileJs), watchDevFiles);

// PRE-PRODUCTION STAGE
exports.preprod = parallel(compileSassToCss, transpileJs);

// PRODUCTION STAGE
exports.concatCSS = concatCSS;
exports.minifyJS = minifyJS;

exports.prod = parallel(concatCSS, minifyJS);