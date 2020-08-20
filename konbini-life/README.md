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

- Sass (Gulp)
    * Transpile sass code into CSS.
```
npm install -D gulp-sass
```

- BrowserSync
```
npm install -D browser-sync
```

- Image Min (Gulp)
    * Minify PNG, JPEG, GIF and SVG images.
```
npm install --save-dev gulp-imagemin
```

- CSS Nano (Gulp)
    * Minify CSS
```
npm install gulp-cssnano --save-dev
```

- Concat (Gulp)
    * Combine whole CSS files into one; Combine whole JS files into one.
    * This benefits by reducing the amount of HTTP requests.
```
npm install --save-dev gulp-concat
```

- HTMLMinifier (to minify your HTML)
- CSSNano and csso (to minify CSS)
- UglifyJS (to minify JavaScript)
- Gulp Source Maps
- Gulp Concat
- Gulp Clean CSS
- Uglify for JavaScriptMinification
- Line Ending Corrector
- Rename (for minified files) - gulp-rename
- and more


Shorthand for Packages (all in one line):
```
npm i -D gulp gulp-sass browser-sync
```


**Extras**

- gulpif
    * Since plugin operations shouldn't be file-type-aware, you may need a plugin like gulp-if to transform subsets of files.
    * [See Conditional Plugins example](https://gulpjs.com/docs/en/getting-started/using-plugins/)