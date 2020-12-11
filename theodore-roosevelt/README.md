# Theodore Roosevelt (a tribute page)


## (Web Design and Web Development) Brief

Type of website: Marketing, Blog / Info-Site

A tribute page to Theodore Roosevelt. || To inspire others (that anyone can go far if you push hard enough and are determined).

Demographic:
- 13+
- Americans
- English literatures
- Historians

Basic Devices


## Sample

(A UI Display in Responsive Design: Mobile, Desktop.)

## Supports

- [ ] Responsive mobile / tablet / laptop - **R**
    Recommended:
        - 380w x 568h (min)
        - 768w x 1024h
        - 1440w x 900h (max)

    * Other view dimensions or angles may suffer. :smiling_imp:

- [ ] Ally (Web Accessibility) - **A11y**
    - [ ] Screenreaders
    - [x] Color accessible

- [ ] Old Browser Support - **OBS**

- [ ] Progressive Web Application **PWA**
      - [ ] Service Worker

- [ ] Graceful Degradation / *Progressive Enhancement* **PE**
    - CSS PE
    - JavaScript PE

- [ ] Available at GitHub Pages (SOON)
    - [ ] Link provided above


## Browsers Compatibility

### Modern Browsers

* Tested on the following browsers:
    - FireFox
    - Google Chrome


### Older Browsers

Less than IE8 may suffer viewing experience. Used another stylesheet for IE browser.


## Prerequisite(s)

Using the latest browser. e.g. Chrome, Firefox.

It is possible Microsoft Edge will work well (because it runs on the same engine as Chrome - the V8 engine).


## Development Installation(s)

* NodeJS
* NPM
* Gulp CLI

### NPM Packages

* gulp
* gulp-html-minifier
* gulp-dart-sass
* autoprefixer
* clean-css
* gulp-postcss
* gulp-babel@next @babel/core
* gulp-uglify
* gulp-terser
* gulp-imagemin
* gulp-sourcemaps
* gulp-concat
* gulp-rename (NOT INCLUDED; Optional)
* browser-sync
* del (???)
* rename

Q. What version of babel you want to transpile to?

* cssnano >> clean-css (as plugins for gulp-postcss)
* autoprefixer (as plugins for gulp-postcss)
* browser-sync

```
npm install --save-dev gulp gulp-html-minifier gulp-dart-sass autoprefixer clean-css gulp-postcss gulp-sourcemaps gulp-uglify gulp-terser gulp-imagemin gulp-concat browser-sync
```

* gulp-babel
* gulp-babel@next
* @babel/core
* @babel/preset-env (enables transforms for ES2015+)

```
npm install --save-dev gulp-babel gulp-babel@next @babel/core @babel/preset-env
```


## Credits

- [](https://www.compart.com/en/unicode/search?q=arrow#characters)
- [Create your design system, part 4: Spacing](https://medium.com/codyhouse/create-your-design-system-part-4-spacing-895c9213e2b9)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

### Inspirations

- [Pure Html and CSS vertical Timeline Design - How To Create a Timeline - Tutorial](https://youtu.be/X6aMWDDJlJg)
- [How To Create a Vertical Timeline Using HTML & CSS](https://www.youtube.com/watch?v=zNccqv0g6Q4&ab_channel=WEBCIFAR)
- [Full Screen Image Slider With HTML, CSS & JS](https://youtu.be/7ZO2RTMNSAY)
- [How To Create a Timeline - Simple Html5 Css 3 Timeline Tutorial For Beginners - Pure CSS Tutorial](https://www.youtube.com/watch?v=sWvRIYJZJ-c&ab_channel=OnlineTutorials)
- [Image Slider - With Auto-play & Manual Navigation Buttons - Using CSS, HTML & Javascript](https://youtu.be/0wvrlOyGlq0)

### Guides and Tutorials

- [Pure CSS for multiline truncation with ellipsis](http://hackingui.com/a-pure-css-solution-for-multiline-text-truncation/)
-[Read More / Read Less Button With Javascript | JS Tutorial](https://youtu.be/A_7sRo-mgz4)
- [Read More Popup Box using Html Css Javascript | Responsive](https://youtu.be/DrshwKL_TYo)
- [JavaScript Nested Loops with Arrays and Objects](https://youtu.be/AqgVLYpBWG8)
- [Element.insertAdjacentElement()](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)
- [How do you create variables in for loop?](https://stackoverflow.com/questions/10325651/how-do-you-create-variables-in-for-loop)
- [How to select all other values in an array except the ith element?](https://stackoverflow.com/questions/15361189/how-to-select-all-other-values-in-an-array-except-the-ith-element)