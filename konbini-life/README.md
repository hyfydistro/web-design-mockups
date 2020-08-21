# Konbini Life

This mockup supports the following:

- [ ] Responsive mobile / tablet / laptop - **R**

- [ ] Ally (Web Accessibility) - **A11y**
    - [ ] Screenreaders
    - [ ] Color accessible

- [ ] Old Browser Support - **OBS** [REJECTED]
      Reasons: Targeting gamers.

- [ ] Progressive Web Application **PWA** [REJECTED]
      Reasons: Only for Marketing; Has no other use than to promote sales.
      - [ ] Service Worker

- [ ] Graceful Degradation / *Progressive Enhancement* **PE**
    - CSS PE
    - JavaScript PE



- [ ] Available at GitHub Pages (SOON)


## Prerequisite(s)

- Node.JS (version 8 or above)
- NPM
- Gulp Command Line Utility
```
npm install -g gulp-cli
```

## Installations

To install dev dependencies:
```
npm install
```

NPM Packages used:

- Gulp
```
npm install -D gulp
```
*HTML*

- Html Minifier
```
npm i gulp-html-minifier
```

*Sass / SCSS /CSS*

- Sass (Gulp)
    * Transpile sass code into CSS.
```
npm install -D gulp-sass
```

- Dart Sass (gulp)
    * Use over (node) sass plugin to use new methods and remove deprecated methods.
```
npm install gulp-dart-sass --save-dev
```

- Autoprefixer (Gulp)
```
npm install -D gulp-autoprefixer
```

- CSS Nano (Gulp)
    * Minify CSS
```
npm install gulp-cssnano --save-dev
```

- PostCSS (Gulp)
    * Needs an array of preprocessors
        e.g. autoprefixer,
        Oldie (IE8 support)
        cssnano (to minify),
        postcss preset env (Gulp)
            `npm install gulp-postcss --save-dev`
```
npm i -D gulp-postcss autoprefixer cssnano
```

* PostCSS
    * Use Future CSS, Today
        `autoprefixer` adds vendor prefixes, using data from Can I Use.
        `postcss-preset-env` allows you to use future CSS features today.

*JavaScript*

- Babel (Gulp)
    * Transpiler
    * See [npm gulp-babel page](https://www.npmjs.com/package/gulp-babel)
Babel 6
```
npm i -D gulp-babel
```
Babel 7
```
npm i -D gulp-babel@next @babel/core
```
*Also include `babel-preset-env` (???) (NOT INSTALLED YET)


- Uglify (Gulp)
    * Minfy JS
```
npm install --save-dev gulp-uglify
```

- Terser (Gulp)
    * Minify ES6
```
npm i -D gulp-terser
```

*Image files*

- Image Min (Gulp)
    * Minify PNG, JPEG, GIF and SVG images.
```
npm install --save-dev gulp-imagemin
```

*Misc.*

- Source Maps (Gulp)
    * If you're working with SASS and you're gonna start using your developer tools within Chrome or Firefox, you don't want to identify where the file that you're going to change the code is located by default. You'll see the style that you're using when you load your project but you're not gonna change it in your main stylesheet. You're going to change any CSS within the SASS files designated for that code, and you'll
    * To make sure that we can identify the location of those files.
    * A source maps is used to tell you which file and line in your original code, a part of minified code comes from. So source maps can be very helpful when debugging minified Angular apps in the browser.
```
npm install -D gulp-sourcemaps
```

- Concat (Gulp)
    * Combine whole CSS files into one; Combine whole JS files into one.
    * This benefits by reducing the amount of HTTP requests.
```
npm install --save-dev gulp-concat
```

- Rename (Gulp)
```
npm i -D gulp-rename
```

- BrowserSync
```
npm install -D browser-sync
```

- HTMLMinifier (to minify your HTML)
- CSSNano and csso (to minify CSS) /
- auto-prefixer /
- UglifyJS (to minify JavaScript) /
- Gulp Source Maps /
- Gulp Concat /
- Gulp Clean CSS /
- Line Ending Corrector
- Rename (for minified files) - gulp-rename
- Source maps
- and more
- postCSS
- Browserslist
- stylelint-no-unsupported-browser-features plugin


Shorthand for Packages (all in one line):
```
npm i -D gulp gulp-sass browser-sync
```


**Extras**

- gulpif
    * Since plugin operations shouldn't be file-type-aware, you may need a plugin like gulp-if to transform subsets of files.
    * [See Conditional Plugins example](https://gulpjs.com/docs/en/getting-started/using-plugins/)


## Credits

- [Gulp 4 Starter(SCSS, Babel, BrowserSync)](https://youtu.be/3R5Coj4JxTo)