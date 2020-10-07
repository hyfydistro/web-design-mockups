const { task, src, dest, watch, series, parallel } = require('gulp');
// const gulp = require('gulp');
const htmlmin = require('gulp-html-minifier'),
    sass = require('gulp-dart-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    oldie = require('oldie'),
    cssnano = require('cssnano'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

// todo:
// Install `gulp-postcss'
// For Modern Browser
//
// For Older Browser Setup
// - oldie /
// - css grace
// - css pie (Oldie is better)
// instruction (MANUALLY DONE)
// http://css3pie.com/documentation/getting-started/
// Fallbacks
// - postcss-color-rgba-fallback
    // transforms rgba() to hexadecimal.
// - autoprefixer
// - postcss-opacity
    // adds opacity filter for IE8.
// - postcss-pseudoelements
    // Convert :: selectors into : selectors for IE 8 compatibility.
// - pixrem
    //generates pixel fallbacks for rem units.

// For production
// cssnano

// List of files name (glob)

// todo:
// - Optimize images and other assets
// - deploy Modern website form
// - Test
// ... IF PASS or SUFFICIENT
// - Add Service Worker
// ... IF PASS or SUFFICIENT
// - Attempt with 'oldie' package
// - Test
//  Consider: Modernizr


const paths = {
    styles: {
        sassSRC: "./src/assets/sass/**/*.sass",
        sassDEST: "./src/css",
        cssSRC: "./src/assets/css/*.css",
        cssDEST: "./dist/assets/css",
        cssOldieSRC: "./src/assets/css/*.css",
        cssOldieDEST: "./src/assets/css.oldie/"
    },
    scripts: {
        jsSRC: "",
        jsDEST: "./dist/assets/js/"
    },
    images: {
        favicon: "",
        bases: ""
    }
};

const styleWatchFiles = [
    './src/assets/sass'
];

const scriptWatchFiles = [
    'src/assets/js/animations/*.js',
    'src/assets/js/modules/*.js'
]

const jsSRC = [
    './src/assets/js/main.js'
];

const imgSRC = [
    './src/images/'
];

const cssSRC = [
    // list css glob in desired order (for concatenation)
    './src/assets/css',
    './src/assets/',
];
// Checklists
// Image Optimization
// Copy & Rename Files
// Uglify (minify) CSS
// Cache Busting
// Copy HTML
// Minify HTML (if possible)
// Concatenate & Uglify CSS / JS

// =================================
// Copy and Miniffy / Optimize Files
// =================================

// * For Modern Browsers

// Copy HTML file and minify to 'dist' folder
function copyHtml() {
    return src('src/*.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
        .pipe(dest('dist'));
}

// function copyImages() {
//     return src('./src/images/*.{png, jpg, jpeg, gif, svg}')
//         .pipe(dest('./dist/images'));
// }

// Minify PNG, JPEG, GIF and SVG with 'imagemin'
function minifyImages() {
    return src('./src/images/*.{jpg,png,svg}')
        .pipe(imagemin())
        .pipe(dest('./dist/images'));
}

// Copy favicon over to DIST repo
function copyFavicon() {
    return src('./src/images/favicon/favicon.ico')
        .pipe(dest('./dist/images/favicon'));
}

// Copy fonts over to DIST repo
function copyFonts() {
    // ? The first line below does not work - it could be case sensitive
    // return src('./src/assets/fonts/*.{woff, woff2, ttf, eot, svg}')
    return src('./src/assets/fonts/*')
        .pipe(dest('./dist/assets/fonts/'));
}


// ==========
// TRANSPILER
// ==========
// SASS to CSS
// ES6 to Pre-ES6

// * You have source maps for SASS and CSS. Decide which one to use becuase TWO files to
// * look at seems redundant.

// Compile sass into css
// Compile css with postcss
function compileSassToCss() {
    // 1. Locate sass file.
    // 2. Initialise sourcemaps
    // 3. Pass the file through sass compiler.
    // 4. Pass the file through PostCSS plugins
        // Add Autoprefixer
    // 5. Choose a directory to save the compiled CSS.
    // 6. Stream changes to all browser.

    return src('src/assets/sass/**/*.sass')
        .pipe(sourcemaps.init())
            .pipe(sass({
                    outputStyle: 'expanded',
                    cascade: false
                }))
                .on('error', sass.logError)
            .pipe(postcss([
                autoprefixer({ overrideBrowserslist: ['ie >= 8', '> 5%'], grid: true })
            ]))
        .pipe(sourcemaps.write())
        .pipe(dest('src/assets/css'))
        .pipe(browserSync.stream());
}

// (DEV ENVIRONMENT)
function transpileJs() {
    // transpile into pre-ES6
    // concat into one file 'main.js'
    return src(scriptWatchFiles)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('src/assets/js'))
        .pipe(browserSync.stream());
}

// ============
// MINIFICATION
// ============

// Minify CSS

// Locate Modern CSS syntax file(s)
function cssMinifyForModernBrowsers() {
    const plugins = [
        cssnano()
    ];

    return src('src/assets/css/*.css')
    .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/assets/css'));
}

// Locate Older CSS syntax file(s)
function cssMinifyForOlderBrowsers() {
    const plugins = [
        cssnano()
    ];

    return src('./src/assets/css/*.css')
    .postcss(plugins)
    .pipe(dest('./dist/assets/css.oldie/*.css'))
}

// Minify Files for Modern Browsers
function minifyFilesForModernBrowsers(cb) {
    cssMinifyForModernBrowsers();
    // jsMinify();
    cb();
}

function minifyFilesForOlderBrowsers() {
    cssMinifyForOlderBrowsers();

}


// * For Older Browsers
// From IE8

function stylesForOlderBrowsers() {
    const plugins = [
        autoprefixeHr(),
        oldie()
    ];

    return src('./src/assets/css/*.css')
    .pipe(postcss(plugins))
    .pipe(dest('./src/assets/css.oldie/'));
}

// ================
// PRODUCTION STAGE
// ================

// Gather ALL main minified CSS into one file
// Older browser support css should be in a different folder
function concatCSS() {
    return src(cssSRC)
    .pipe(sourcemaps.init({
        // loadMaps: true,
        largeFile: true
    }))
    .pipe(concat('style.min.css'))
    // .pipe(sourcemaps.write('./maps/'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/assets/css/'));
}

function concatJS() {
    return src(jsSRC)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest(paths.scripts.jsDEST));
}

function cleanDist() {

}

// ================================
// WATCH FILES AND UPDATE TO SERVER
// ================================

function dev() {
    browserSync.init({
        server: {
            baseDir: './src/',
            index: 'index.html'
        }
    });

    // Run function when any sass file changes
    watch('src/assets/sass/**/*.sass', compileSassToCss);
    watch(scriptWatchFiles, transpileJs);
    // watch(scriptWatchFiles).on('change', browserSync.reload);
    watch('src/*.html').on('change', browserSync.reload);
}

// Ready Production Code function
// Minify, etc.

// Update function
// Cache Busting

// For Development
// - Transpile
//  - Sass to CSS
//  - CSS with PostCSS
//  - ES6 to pre-ES6
// - cross browser compatibility
// - watch

// For Production
// - minify
//  - CSS
//  - JS
// - concat
// - rename (?)

// TASKS
exports.copyHtml = copyHtml;
exports.copyFavicon = copyFavicon;
// exports.copyImages = copyImages;
exports.copyFonts = copyFonts;
// Transpiler
exports.compileSassToCss = compileSassToCss;
exports.transpileJs = transpileJs; // Concat all JS files + Minified
// Optimization
exports.minifyImages = minifyImages;
// Minification
exports.cssMinifyForModernBrowsers = cssMinifyForModernBrowsers;
exports.cssMinifyForOlderBrowsers = cssMinifyForOlderBrowsers;
exports.concatJS =concatJS;

// DEVELOPMENT
exports.dev = series(parallel(compileSassToCss, transpileJs), dev);

// PRODUCTION
// For Modern Browsers
exports.default = parallel(copyHtml, minifyImages, copyFavicon, copyFonts, cssMinifyForModernBrowsers, concatJS);

// For Older Browsers
// exports.oldie = parallel()


// exports.default = series(compileSassToCss, minifyFilesForModernBrowsers);
// exports.default = parallel();

// exports.build = series();

// # Modern Browsers Production Checklist
// Transpile SASS to CSS
//  - compileSassToCss [*]
// Transpile CSS for IE 8
//  - ...
// Minify CSS for Modern Browsers [*]
// Minify CSS for Older Browsers [ ]
// TanspileJS
//  - Uglify (Minify) [*]
//  - Concat (Sourced into 1 file) [*]
// copyHtml
//  - HTML Minifier [*]
// Optimize
//  - copyImage [*]
//  - imagemin [*]
// copyFonts [*]

// What is concat for???
