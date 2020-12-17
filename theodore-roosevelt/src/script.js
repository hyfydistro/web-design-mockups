"use strict";

// Service Worker
if ("serviceWorker" in navigator) {
  console.log("SW is supported");
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then(function (reg) {
      return console.log("Service Worker: Registered");
    })["catch"](function (err) {
      return console.log("Service Worker: Error: ".concat(err));
    });
  });
}
"use strict";

// ! Safari does not support 'Intersection Observer', use polyfill (?)
var mq600 = window.matchMedia("(max-width: 600px)");
var mq1024 = window.matchMedia("(max-width: 1024px)"); // Add-on class appear

var faders = document.querySelectorAll('.fader'); // Add-on class slide

var sliders = document.querySelectorAll('.slider'); // Add-on class reveal

var revealers = document.querySelectorAll('.revealer'); // * Configurations: "fade-in"
// appear when the entire content is in view
// DEFAULT || FOR DESKTOP-TABLET

var appearOptions = {
  threshold: 1,
  // fires by how much the element is on display
  rootMargin: "0px 0px -100px 0px" // top right bottom left

}; // FOR MOBILE

var appearOptionsMobileView = {
  threshold: 0.5,
  rootMargin: "0px 0px 0px 0px"
}; // * Configurations: "slide-in"
// DEFAULT

var revealOptions = {
  threshold: 0.8,
  rootMargin: "0px 0px 0px 0px"
}; // * Configurations: "slide-in"
// DEFAULT

var sliderOptions = {
  threshold: 0.8,
  rootMargin: "0px 0px 45px 0px" // rootMargin: "0px 0px -250px 0px"

}; // # REVEALERS

var revealOnScrollMobileView = new IntersectionObserver(function (entries, revealOnScrollMobileView) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('reveal');
      revealOnScrollMobileView.unobserve(entry.target);
    }
  });
}, revealOptions); // # SLIDERS

var slideOnScrollMobileView = new IntersectionObserver(function (entries, slideOnScrollMobileView) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('slide');
      slideOnScrollMobileView.unobserve(entry.target);
    }
  });
}, sliderOptions);
revealers.forEach(function (revealer) {
  revealOnScrollMobileView.observe(revealer);
});
sliders.forEach(function (slider) {
  slideOnScrollMobileView.observe(slider);
});

if (mq600.matches) {
  // # FADERS
  var appearOnScrollMobileView = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptionsMobileView);
  faders.forEach(function (fader) {
    appearOnScrollMobileView.observe(fader);
  });
} else {
  var appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(function (fader) {
    appearOnScroll.observe(fader);
  });
}
// header module
"use strict";
"use strict";

// # MAIN
// CTA "READ MORE" Button
// Targets:
var readMoreBtn = document.querySelectorAll('.read-more-btn');
var moreText = document.querySelectorAll('.more');
var dots = document.querySelectorAll('.dots');
var doubleArrowSymbol = document.querySelectorAll('.double-arrow-symbol');
var ContainerReadMoreBtn = document.querySelectorAll('.container-read-more-btn');
var timelineWrappers = document.querySelectorAll('.timeline-wrap');
var timelineBgEnd = document.querySelector('.timeline-bg-dot.end');
var timelineItems = document.querySelectorAll('.timeline-item');
var timelineItem = document.querySelector('.timeline-item');
var galleryContainer = document.querySelectorAll('.gallery'); // # "READ MORE" Button - toggle function
// change button text
// change button position

var _loop = function _loop(i) {
  var isOpened = false;
  readMoreBtn[i].addEventListener('click', function moreContent() {
    if (!isOpened) {
      dots[i].style.display = 'none';
      moreText[i].style.display = 'inline';
      readMoreBtn[i].innerHTML = '<span class="double-arrow-symbol">&laquo;</span> READ LESS ';
      ContainerReadMoreBtn[i].style.justifyContent = 'flex-end';
      ContainerReadMoreBtn[i].classList.add('open');
      galleryContainer[i].classList.add('open');
      isOpened = true; // * NOTE: timelineWrappers length and readMoreBtn length are different!

      if (i >= 6) {
        // * Hotfix: unresponsive click event listener for last timeline-item
        // * Situation: Unable to close
        // Condtion: Target last element
        if (i == readMoreBtn.length - 1) {
          // timelineWrappers[i + 1].classList.add('open');
          timelineWrappers[i + 1].insertAdjacentElement('afterend', ContainerReadMoreBtn[i]);
          timelineWrappers[i + 1].insertAdjacentElement('afterend', galleryContainer[i]);
        } else {
          // * Styles: Give padding to NEXT timeline-wrap
          timelineWrappers[i + 2].classList.add('open');
          timelineWrappers[i + 1].insertAdjacentElement('afterend', ContainerReadMoreBtn[i]);
          timelineWrappers[i + 1].insertAdjacentElement('afterend', galleryContainer[i]);
        }
      } else {
        timelineWrappers[i + 1].classList.add('open');
        timelineWrappers[i].insertAdjacentElement('afterend', ContainerReadMoreBtn[i]);
        timelineWrappers[i].insertAdjacentElement('afterend', galleryContainer[i]);
      } // * Situation: [Styles addition / hotfix]
      // add aesthetic for last two gallery interaction


      if (i == readMoreBtn.length - 2) {
        timelineBgEnd.classList.add('special');
      }
    } else {
      dots[i].style.display = 'inline';
      moreText[i].style.display = 'none';
      readMoreBtn[i].innerHTML = 'READ MORE <span class="double-arrow-symbol">&raquo;</span>';
      ContainerReadMoreBtn[i].style.justifyContent = 'flex-start';
      ContainerReadMoreBtn[i].classList.remove('open');
      galleryContainer[i].classList.remove('open');
      isOpened = false;

      if (i >= 6) {
        if (i == readMoreBtn.length - 1) {
          // * UNLESS... if the previous element for the last timeline wrapper is open, keep class open (the padding)
          timelineWrappers[i + 1].classList.remove('open');
          timelineItems[i + 1].insertAdjacentElement('beforeend', galleryContainer[i]);
          timelineItems[i + 1].insertAdjacentElement('beforeend', ContainerReadMoreBtn[i]);
        } else {
          timelineWrappers[i + 2].classList.remove('open');
          timelineItems[i + 1].insertAdjacentElement('beforeend', galleryContainer[i]);
          timelineItems[i + 1].insertAdjacentElement('beforeend', ContainerReadMoreBtn[i]);
        }
      } else {
        timelineWrappers[i + 1].classList.remove('open');
        timelineItems[i].insertAdjacentElement('beforeend', galleryContainer[i]);
        timelineItems[i].insertAdjacentElement('beforeend', ContainerReadMoreBtn[i]);
      } // * Situation: [Styles addition / hotfix]
      // add aesthetic for last two gallery interaction


      if (galleryContainer[readMoreBtn.length - 2].classList.contains('open')) {
        // don't do anything // return values
        timelineWrappers[i + 1].classList.add('open');
      } else if (i == readMoreBtn.length - 2) {
        timelineBgEnd.classList.remove('special');
      }
    }
  });
};

for (var i = 0; i < readMoreBtn.length; i += 1) {
  _loop(i);
} // # GALLERY SETUP


var mq600 = window.matchMedia("(max-width: 600px)");
var mq1024 = window.matchMedia("(max-width: 1024px)");

if (mq600.matches) {
  // # MOBILE image size
  var galleryProperty = {
    '1858': {
      'index': 0,
      'url': ['images/tr-age11-paris-209w.jpg', 'images/Birthplace-from-west-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt 11 years old at Paris.', 'Manhattan'],
      'figcaption': ['T.R. 11 years old. (Paris)', 'Manhattan.']
    },
    '1879': {
      'index': 1,
      'url': ['images/tr-avid-boxer-at-harvard-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt sitting down with his arms crossed.'],
      'figcaption': ['T.R. an avid boxerand wrestler. (Harvard)']
    },
    '1880': {
      'index': 2,
      'url': ['images/white-house-portrait-sml-600w.jpg'],
      'alt': ['Portrait of Theodore Roosevelt painted by John Singer Sargent.'],
      'figcaption': ['This official portrait of Theodore Roosevelt was painted by John Singer Sargent.']
    },
    '1881': {
      'index': 3,
      'url': ['images/roosevelt-reading-sml-600w.jpg', 'images/tr-writings-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt sitting with a book on his hand.', 'A collection of Theodore\'s books on the shelf'],
      'figcaption': ['T.R. sitting with a book on his hand.', 'T.R. books he has written.']
    },
    '1884': {
      'index': 4,
      'url': ['images/tr-mother-and-first-wife-sml-600w.jpg', 'images/tr-sherif-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt\'s mother and wife.', 'Theodore Roosevelt in sherif\'s uniform'],
      'figcaption': ['T.R.\'s mother (left) and his first wife (right).', 'T.R. as a sherif.']
    },
    '1886': {
      'index': 5,
      'url': ['images/tr-horse-sml-600w.jpg', 'images/tr-new-family-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt on a horse.', 'Theodore Roosevelt and his new family.'],
      'figcaption': ['T.R. writing at a desk.', 'T.R. family.']
    },
    '1895': {
      'index': 6,
      'url': null,
      'alt': null,
      'figcaption': null
    },
    '1897': {
      'index': 7,
      'url': ['images/spanish-vs-americans-sml-600w.jpg', 'images/rough-riders-sml-600w.jpg'],
      'alt': ['A painting of the Asiatic Squadron destroying Spanish fleet in Battle of Manila Bay.', 'A group of people known as the Rough Riders'],
      'figcaption': ['Asiatic Squadron destroying Spanish fleet in Battle of Manila Bay on May 1 1898', 'Rough Riders']
    },
    '1901': {
      'index': 8,
      'url': ['images/tr-at-chicago-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt at Chicago.'],
      'figcaption': ['T.R. at Chicago.']
    },
    '1909': {
      'index': 9,
      'url': ['images/tr-safari-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt standing next to the elephant he shot on safari.'],
      'figcaption': ['T.R standing next to the elephant he shot on safari.']
    },
    '1910': {
      'index': 10,
      'url': ['images/tr-and-taft-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt and Taft.'],
      'figcaption': ['T.R (left) and Taft (right).']
    },
    '1912': {
      'index': 11,
      'url': ['images/tr-medical-xray-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt medical x-ray on October 14 after the assassination attempt, showing the bullet.'],
      'figcaption': ['T.R. medical x-ray on October 14 after the assassination attempt, showing the bullet.']
    },
    '1919': {
      'index': 12,
      'url': ['images/tr-tomb-sml-600w.jpg'],
      'alt': ['Theodore Roosevelt\'s grave.'],
      'figcaption': ['T.R.\'s grave, Oyster Bay, New York.']
    }
  };
  createGallery(galleryProperty);
} else if (mq1024.matches) {
  // # TABLET image size
  var _galleryProperty = {
    '1858': {
      'index': 0,
      'url': ['images/tr-age11-paris-209w.jpg', 'images/Birthplace-from-west-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt 11 years old at Paris.', 'Manhattan'],
      'figcaption': ['T.R. 11 years old. (Paris)', 'Manhattan.']
    },
    '1879': {
      'index': 1,
      'url': ['images/tr-avid-boxer-at-harvard-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt sitting down with his arms crossed.'],
      'figcaption': ['T.R. an avid boxerand wrestler. (Harvard)']
    },
    '1880': {
      'index': 2,
      'url': ['images/white-house-portrait-med-1024w.jpg'],
      'alt': ['Portrait of Theodore Roosevelt painted by John Singer Sargent.'],
      'figcaption': ['This official portrait of Theodore Roosevelt was painted by John Singer Sargent.']
    },
    '1881': {
      'index': 3,
      'url': ['images/roosevelt-reading-1000w.jpg', 'images/tr-writings-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt sitting with a book on his hand.', 'A collection of Theodore\'s books on the shelf'],
      'figcaption': ['T.R. sitting with a book on his hand.', 'T.R. books he has written.']
    },
    '1884': {
      'index': 4,
      'url': ['images/tr-mother-and-first-wife-1065w.jpg', 'images/tr-sherif-800w.jpg'],
      'alt': ['Theodore Roosevelt\'s mother and wife.', 'Theodore Roosevelt in sherif\'s uniform'],
      'figcaption': ['T.R.\'s mother (left) and his first wife (right).', 'T.R. as a sherif.']
    },
    '1886': {
      'index': 5,
      'url': ['images/tr-horse-med-1024w.jpg', 'images/tr-new-family-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt on a horse.', 'Theodore Roosevelt and his new family.'],
      'figcaption': ['T.R. writing at a desk.', 'T.R. family.']
    },
    '1895': {
      'index': 6,
      'url': null,
      'alt': null,
      'figcaption': null
    },
    '1897': {
      'index': 7,
      'url': ['images/spanish-vs-americans-med-1024w.jpg', 'images/rough-riders-med-1024w.jpg'],
      'alt': ['A painting of the Asiatic Squadron destroying Spanish fleet in Battle of Manila Bay.', 'A group of people known as the Rough Riders'],
      'figcaption': ['Asiatic Squadron destroying Spanish fleet in Battle of Manila Bay on May 1 1898', 'Rough Riders']
    },
    '1901': {
      'index': 8,
      'url': ['images/tr-at-chicago-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt at Chicago.'],
      'figcaption': ['T.R. at Chicago.']
    },
    '1909': {
      'index': 9,
      'url': ['images/tr-safari-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt standing next to the elephant he shot on safari.'],
      'figcaption': ['T.R standing next to the elephant he shot on safari.']
    },
    '1910': {
      'index': 10,
      'url': ['images/tr-and-taft-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt and Taft.'],
      'figcaption': ['T.R (left) and Taft (right).']
    },
    '1912': {
      'index': 11,
      'url': ['images/tr-medical-xray-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt medical x-ray on October 14 after the assassination attempt, showing the bullet.'],
      'figcaption': ['T.R. medical x-ray on October 14 after the assassination attempt, showing the bullet.']
    },
    '1919': {
      'index': 12,
      'url': ['images/tr-tomb-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt\'s grave.'],
      'figcaption': ['T.R.\'s grave, Oyster Bay, New York.']
    }
  };
  createGallery(_galleryProperty);
} else {
  // # DESKTOP (or higher) image size
  var _galleryProperty2 = {
    '1858': {
      'index': 0,
      'url': ['images/tr-age11-paris-209w.jpg', 'images/Birthplace-from-west-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt 11 years old at Paris.', 'Manhattan'],
      'figcaption': ['T.R. 11 years old. (Paris)', 'Manhattan.']
    },
    '1879': {
      'index': 1,
      'url': ['images/tr-avid-boxer-at-harvard-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt sitting down with his arms crossed.'],
      'figcaption': ['T.R. an avid boxerand wrestler. (Harvard)']
    },
    '1880': {
      'index': 2,
      'url': ['images/white-house-portrait-lge-1280w.jpg'],
      'alt': ['Portrait of Theodore Roosevelt painted by John Singer Sargent.'],
      'figcaption': ['This official portrait of Theodore Roosevelt was painted by John Singer Sargent.']
    },
    '1881': {
      'index': 3,
      'url': ['images/roosevelt-reading-1000w.jpg', 'images/tr-writings-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt sitting with a book on his hand.', 'A collection of Theodore\'s books on the shelf'],
      'figcaption': ['T.R. sitting with a book on his hand.', 'T.R. books he has written.']
    },
    '1884': {
      'index': 4,
      'url': ['images/tr-mother-and-first-wife-1065w.jpg', 'images/tr-sherif-800w.jpg'],
      'alt': ['Theodore Roosevelt\'s mother and wife.', 'Theodore Roosevelt in sherif\'s uniform'],
      'figcaption': ['T.R.\'s mother (left) and his first wife (right).', 'T.R. as a sherif.']
    },
    '1886': {
      'index': 5,
      'url': ['images/tr-horse-lge-1280w.jpg', 'images/tr-new-family-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt on a horse.', 'Theodore Roosevelt and his new family.'],
      'figcaption': ['T.R. writing at a desk.', 'T.R. family.']
    },
    '1895': {
      'index': 6,
      'url': null,
      'alt': null,
      'figcaption': null
    },
    '1897': {
      'index': 7,
      'url': ['images/spanish-vs-americans-lge-1280w.jpg', 'images/rough-riders-1144w.jpg'],
      'alt': ['A painting of the Asiatic Squadron destroying Spanish fleet in Battle of Manila Bay.', 'A group of people known as the Rough Riders'],
      'figcaption': ['Asiatic Squadron destroying Spanish fleet in Battle of Manila Bay on May 1 1898', 'Rough Riders']
    },
    '1901': {
      'index': 8,
      'url': ['images/tr-at-chicago-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt at Chicago.'],
      'figcaption': ['T.R. at Chicago.']
    },
    '1909': {
      'index': 9,
      'url': ['images/tr-safari-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt standing next to the elephant he shot on safari.'],
      'figcaption': ['T.R standing next to the elephant he shot on safari.']
    },
    '1910': {
      'index': 10,
      'url': ['images/tr-and-taft-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt and Taft.'],
      'figcaption': ['T.R (left) and Taft (right).']
    },
    '1912': {
      'index': 11,
      'url': ['images/tr-medical-xray-lge-1280w.jpg'],
      'alt': ['Theodore Roosevelt medical x-ray on October 14 after the assassination attempt, showing the bullet.'],
      'figcaption': ['T.R. medical x-ray on October 14 after the assassination attempt, showing the bullet.']
    },
    '1919': {
      'index': 12,
      'url': ['images/tr-tomb-med-1024w.jpg'],
      'alt': ['Theodore Roosevelt\'s grave.'],
      'figcaption': ['T.R.\'s grave, Oyster Bay, New York.']
    }
  };
  createGallery(_galleryProperty2);
} // total x13 timeline items


function createGallery(galleryProperty) {
  var _loop2 = function _loop2(key) {
    // # Create '.gallery__content',
    // '.gallery__image',
    // 'gallery__text',
    // 'p' element,
    // # Create an Event Listener
    // textNode alt text for each image [Storage] >> Add Event Listener
    // textNode figcaption for each image [Storage] >> Add Event Listener
    // images for each image [Storage] >> Add Event Listener
    // # Creat IF condition is met
    // If there is more than one image url stored
    // Create span Tags for dot indicators
    // Add Event Listener
    // When 'click' show current slide
    // function currentSlide()
    // Create prev / next button to look through images
    // Add Event Listener
    // When 'click' move previous or next
    // Disable  prev / next when at the end or beginning of length.
    // ! WIP - Need to skip this text section to display images >>
    if (key == '1895') {
      return "continue";
    }

    if (galleryProperty[key]['index'] === 6) {
      return "continue";
    } // ! <<
    // Create '.gallery__content'


    var galleryContent = document.createElement('div');
    galleryContent.className = 'gallery__content'; // Create '.gallery__image'

    var galleryImageSlider = document.createElement('div');
    galleryImageSlider.className = 'gallery__image'; // Create '.gallery__text'

    var galleryText = document.createElement('div');
    galleryText.className = 'gallery__text'; // Create 'p' element

    var text = document.createElement('p'); // Create 'image' element

    var images = document.createElement('img'); // Create textNode for the first element of the array

    var textNode = document.createTextNode(galleryProperty[key]['figcaption'][0]); // Set up first image to display as default
    // Append images

    images.src = galleryProperty[key]['url'][0];
    images.alt = galleryProperty[key]['alt'][0]; // # Append the whole gallery content together

    var index = galleryProperty[key]['index']; // * Condition for the 6th only text maintenance

    if (index >= 6) {
      galleryContainer[index - 1].appendChild(galleryContent);
    } else {
      galleryContainer[index].appendChild(galleryContent);
    }

    galleryContent.appendChild(galleryImageSlider);
    galleryImageSlider.appendChild(images);
    galleryContent.appendChild(galleryText);
    galleryText.appendChild(text);
    text.appendChild(textNode); // Create gallery ImageSlide function if conditions are met
    // If 'url' length is greater than 1

    if (galleryProperty[key]['url'].length > 1) {
      (function () {
        // Create prev / next button
        var prevBtn = document.createElement('a');
        prevBtn.className = 'prev';
        var nextBtn = document.createElement('a');
        nextBtn.className = 'next'; // Create prev / next background for button, and add class

        var prevBtnBg = document.createElement('span');
        prevBtnBg.className = 'prev-btn-bg';
        var nextBtnBg = document.createElement('span');
        nextBtnBg.className = 'next-btn-bg'; // Insert button to bg button

        prevBtnBg.appendChild(prevBtn);
        nextBtnBg.appendChild(nextBtn);
        var slideIndex = 0; // Create dot container

        var containerDots = document.createElement('div');
        containerDots.className = 'container-dots'; // All the dot indicator stored for each gallery section

        var dotArr = []; // Create dots (as many as the images exist)

        var _loop3 = function _loop3(j) {
          dotArr[j] = document.createElement('span');
          dotArr[j].className = 'dot'; // Add class '.active' to the first image on display

          if (j == 0) {
            dotArr[j].classList.toggle('active');
          } // Create Event Listener for dot indicator
          // if a dot is selected, add class '.active'
          // and remove other dots of that class


          dotArr[j].addEventListener('click', function () {
            // add toggle add/remove class
            dotArr[j].classList.toggle('active'); // Remove class '.active' from other dot(s) than the one selected

            var unselected = dotArr.filter(function (elem) {
              return elem !== dotArr[j];
            });

            for (var x = 0; x < unselected.length; x += 1) {
              unselected[x].classList.remove('active');
            } // Change Slider Index and image on display


            slideIndex = j;
            images.src = galleryProperty[key]['url'][slideIndex];
            images.alt = galleryProperty[key]['alt'][slideIndex];
            text.textContent = galleryProperty[key]['figcaption'][slideIndex];
          });
          containerDots.appendChild(dotArr[j]);
        };

        for (var j = 0; j < galleryProperty[key]['url'].length; j += 1) {
          _loop3(j);
        } // Add Event Listener


        prevBtnBg.addEventListener('click', function () {
          // Condition
          if (slideIndex === 0) {
            slideIndex = galleryProperty[key]['url'].length - 1;
            images.src = galleryProperty[key]['url'][slideIndex];
            images.alt = galleryProperty[key]['alt'][slideIndex];
            text.textContent = galleryProperty[key]['figcaption'][slideIndex]; // Change dot indicator

            var currentDotArr = containerDots.childNodes;

            for (var y = 0; y < containerDots.childNodes.length; y += 1) {
              currentDotArr[y].classList.remove('active');

              if (y == slideIndex) {
                currentDotArr[y].classList.add('active');
              }
            }
          } else {
            slideIndex--; // Change image url, alt text and figcaption

            images.src = galleryProperty[key]['url'][slideIndex];
            images.alt = galleryProperty[key]['alt'][slideIndex];
            text.textContent = galleryProperty[key]['figcaption'][slideIndex]; // Change dot indicator

            var _currentDotArr = containerDots.childNodes;

            for (var _y = 0; _y < containerDots.childNodes.length; _y += 1) {
              _currentDotArr[_y].classList.remove('active');

              if (_y == slideIndex) {
                _currentDotArr[_y].classList.add('active');
              }
            }
          }
        });
        nextBtnBg.addEventListener('click', function () {
          // Condition
          if (slideIndex === galleryProperty[key]['url'].length - 1) {
            slideIndex = 0;
            images.src = galleryProperty[key]['url'][slideIndex];
            images.alt = galleryProperty[key]['alt'][slideIndex];
            text.textContent = galleryProperty[key]['figcaption'][slideIndex]; // Change dot indicator

            var currentDotArr = containerDots.childNodes;

            for (var y = 0; y < containerDots.childNodes.length; y += 1) {
              currentDotArr[y].classList.remove('active');

              if (y == slideIndex) {
                currentDotArr[y].classList.add('active');
              }
            }
          } else {
            slideIndex++;
            images.src = galleryProperty[key]['url'][slideIndex];
            images.alt = galleryProperty[key]['alt'][slideIndex];
            text.textContent = galleryProperty[key]['figcaption'][slideIndex]; // Change dot indicator

            var _currentDotArr2 = containerDots.childNodes;

            for (var _y2 = 0; _y2 < containerDots.childNodes.length; _y2 += 1) {
              _currentDotArr2[_y2].classList.remove('active');

              if (_y2 == slideIndex) {
                _currentDotArr2[_y2].classList.add('active');
              }
            }
          }
        }); // Append dot-indicator container, dots, prev button, next button

        galleryImageSlider.appendChild(containerDots);
        galleryImageSlider.appendChild(prevBtnBg);
        galleryImageSlider.appendChild(nextBtnBg);
      })();
    }
  };

  for (var key in galleryProperty) {
    var _ret = _loop2(key);

    if (_ret === "continue") continue;
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFuaW1hdGlvbnMvb25zY3JvbGwuanMiLCJtb2R1bGVzL2hlYWRlci5qcyIsIm1vZHVsZXMvbWFpbi5qcyJdLCJuYW1lcyI6WyJuYXZpZ2F0b3IiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInRoZW4iLCJyZWciLCJlcnIiLCJtcTYwMCIsIm1hdGNoTWVkaWEiLCJtcTEwMjQiLCJmYWRlcnMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzbGlkZXJzIiwicmV2ZWFsZXJzIiwiYXBwZWFyT3B0aW9ucyIsInRocmVzaG9sZCIsInJvb3RNYXJnaW4iLCJhcHBlYXJPcHRpb25zTW9iaWxlVmlldyIsInJldmVhbE9wdGlvbnMiLCJzbGlkZXJPcHRpb25zIiwicmV2ZWFsT25TY3JvbGxNb2JpbGVWaWV3IiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1bm9ic2VydmUiLCJzbGlkZU9uU2Nyb2xsTW9iaWxlVmlldyIsInJldmVhbGVyIiwib2JzZXJ2ZSIsInNsaWRlciIsIm1hdGNoZXMiLCJhcHBlYXJPblNjcm9sbE1vYmlsZVZpZXciLCJhcHBlYXJPblNjcm9sbCIsImZhZGVyIiwicmVhZE1vcmVCdG4iLCJtb3JlVGV4dCIsImRvdHMiLCJkb3VibGVBcnJvd1N5bWJvbCIsIkNvbnRhaW5lclJlYWRNb3JlQnRuIiwidGltZWxpbmVXcmFwcGVycyIsInRpbWVsaW5lQmdFbmQiLCJxdWVyeVNlbGVjdG9yIiwidGltZWxpbmVJdGVtcyIsInRpbWVsaW5lSXRlbSIsImdhbGxlcnlDb250YWluZXIiLCJpIiwiaXNPcGVuZWQiLCJtb3JlQ29udGVudCIsInN0eWxlIiwiZGlzcGxheSIsImlubmVySFRNTCIsImp1c3RpZnlDb250ZW50IiwibGVuZ3RoIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwicmVtb3ZlIiwiY29udGFpbnMiLCJnYWxsZXJ5UHJvcGVydHkiLCJjcmVhdGVHYWxsZXJ5Iiwia2V5IiwiZ2FsbGVyeUNvbnRlbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZ2FsbGVyeUltYWdlU2xpZGVyIiwiZ2FsbGVyeVRleHQiLCJ0ZXh0IiwiaW1hZ2VzIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsInNyYyIsImFsdCIsImluZGV4IiwiYXBwZW5kQ2hpbGQiLCJwcmV2QnRuIiwibmV4dEJ0biIsInByZXZCdG5CZyIsIm5leHRCdG5CZyIsInNsaWRlSW5kZXgiLCJjb250YWluZXJEb3RzIiwiZG90QXJyIiwiaiIsInRvZ2dsZSIsInVuc2VsZWN0ZWQiLCJmaWx0ZXIiLCJlbGVtIiwieCIsInRleHRDb250ZW50IiwiY3VycmVudERvdEFyciIsImNoaWxkTm9kZXMiLCJ5Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSSxtQkFBbUJBLFNBQXZCLEVBQWtDO0FBQzlCQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBQyxFQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDcENKLElBQUFBLFNBQVMsQ0FBQ0ssYUFBVixDQUNHQyxRQURILENBQ1ksT0FEWixFQUVHQyxJQUZILENBRVEsVUFBQ0MsR0FBRDtBQUFBLGFBQVNQLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaLENBQVQ7QUFBQSxLQUZSLFdBR1MsVUFBQ08sR0FBRDtBQUFBLGFBQVNSLE9BQU8sQ0FBQ0MsR0FBUixrQ0FBc0NPLEdBQXRDLEVBQVQ7QUFBQSxLQUhUO0FBSUQsR0FMRDtBQU1EOzs7QUNUSDtBQUVBLElBQU1DLEtBQUssR0FBR1AsTUFBTSxDQUFDUSxVQUFQLENBQWtCLG9CQUFsQixDQUFkO0FBQ0EsSUFBTUMsTUFBTSxHQUFHVCxNQUFNLENBQUNRLFVBQVAsQ0FBa0IscUJBQWxC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Y2UgV29ya2VyXHJcbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiU1cgaXMgc3VwcG9ydGVkXCIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcclxuICAgICAgICAucmVnaXN0ZXIoXCJzdy5qc1wiKVxyXG4gICAgICAgIC50aGVuKChyZWcpID0+IGNvbnNvbGUubG9nKFwiU2VydmljZSBXb3JrZXI6IFJlZ2lzdGVyZWRcIikpXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGBTZXJ2aWNlIFdvcmtlcjogRXJyb3I6ICR7ZXJyfWApKTtcclxuICAgIH0pO1xyXG4gIH0iLCIvLyAhIFNhZmFyaSBkb2VzIG5vdCBzdXBwb3J0ICdJbnRlcnNlY3Rpb24gT2JzZXJ2ZXInLCB1c2UgcG9seWZpbGwgKD8pXHJcblxyXG5jb25zdCBtcTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xyXG5jb25zdCBtcTEwMjQgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEwMjRweClcIik7XHJcblxyXG4vLyBBZGQtb24gY2xhc3MgYXBwZWFyXHJcbmNvbnN0IGZhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYWRlcicpO1xyXG4vLyBBZGQtb24gY2xhc3Mgc2xpZGVcclxuY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXInKTtcclxuLy8gQWRkLW9uIGNsYXNzIHJldmVhbFxyXG5jb25zdCByZXZlYWxlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2ZWFsZXInKTtcclxuXHJcbi8vICogQ29uZmlndXJhdGlvbnM6IFwiZmFkZS1pblwiXHJcbi8vIGFwcGVhciB3aGVuIHRoZSBlbnRpcmUgY29udGVudCBpcyBpbiB2aWV3XHJcblxyXG4vLyBERUZBVUxUIHx8IEZPUiBERVNLVE9QLVRBQkxFVFxyXG5jb25zdCBhcHBlYXJPcHRpb25zID0ge1xyXG4gICAgdGhyZXNob2xkOiAxLCAvLyBmaXJlcyBieSBob3cgbXVjaCB0aGUgZWxlbWVudCBpcyBvbiBkaXNwbGF5XHJcbiAgICByb290TWFyZ2luOiBcIjBweCAwcHggLTEwMHB4IDBweFwiIC8vIHRvcCByaWdodCBib3R0b20gbGVmdFxyXG59O1xyXG5cclxuLy8gRk9SIE1PQklMRVxyXG5jb25zdCBhcHBlYXJPcHRpb25zTW9iaWxlVmlldyA9IHtcclxuICAgIHRocmVzaG9sZDogMC41LFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIlxyXG59O1xyXG5cclxuLy8gKiBDb25maWd1cmF0aW9uczogXCJzbGlkZS1pblwiXHJcbi8vIERFRkFVTFRcclxuY29uc3QgcmV2ZWFsT3B0aW9ucyA9IHtcclxuICAgIHRocmVzaG9sZDogMC44LFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIlxyXG59O1xyXG5cclxuLy8gKiBDb25maWd1cmF0aW9uczogXCJzbGlkZS1pblwiXHJcbi8vIERFRkFVTFRcclxuY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcclxuICAgIHRocmVzaG9sZDogMC44LFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDQ1cHggMHB4XCJcclxuICAgIC8vIHJvb3RNYXJnaW46IFwiMHB4IDBweCAtMjUwcHggMHB4XCJcclxufTtcclxuXHJcbi8vICMgUkVWRUFMRVJTXHJcbmNvbnN0IHJldmVhbE9uU2Nyb2xsTW9iaWxlVmlldyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcywgcmV2ZWFsT25TY3JvbGxNb2JpbGVWaWV3KSB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdyZXZlYWwnKTtcclxuICAgICAgICAgICAgcmV2ZWFsT25TY3JvbGxNb2JpbGVWaWV3LnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59LCByZXZlYWxPcHRpb25zKTtcclxuXHJcbi8vICMgU0xJREVSU1xyXG5jb25zdCBzbGlkZU9uU2Nyb2xsTW9iaWxlVmlldyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcywgc2xpZGVPblNjcm9sbE1vYmlsZVZpZXcpIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgaWYgKCFlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NsaWRlJyk7XHJcbiAgICAgICAgICAgIHNsaWRlT25TY3JvbGxNb2JpbGVWaWV3LnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59LCBzbGlkZXJPcHRpb25zKTtcclxuXHJcbnJldmVhbGVycy5mb3JFYWNoKHJldmVhbGVyID0+IHtcclxuICAgIHJldmVhbE9uU2Nyb2xsTW9iaWxlVmlldy5vYnNlcnZlKHJldmVhbGVyKTtcclxufSlcclxuXHJcbnNsaWRlcnMuZm9yRWFjaChzbGlkZXIgPT4ge1xyXG4gICAgc2xpZGVPblNjcm9sbE1vYmlsZVZpZXcub2JzZXJ2ZShzbGlkZXIpO1xyXG59KVxyXG5cclxuXHJcbmlmIChtcTYwMC5tYXRjaGVzKSB7XHJcbiAgICAvLyAjIEZBREVSU1xyXG4gICAgY29uc3QgYXBwZWFyT25TY3JvbGxNb2JpbGVWaWV3ID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChlbnRyaWVzLCBhcHBlYXJPblNjcm9sbCkge1xyXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhcHBlYXInKTtcclxuICAgICAgICAgICAgICAgIGFwcGVhck9uU2Nyb2xsLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCBhcHBlYXJPcHRpb25zTW9iaWxlVmlldyk7XHJcblxyXG5cclxuXHJcbiAgICBmYWRlcnMuZm9yRWFjaChmYWRlciA9PiB7XHJcbiAgICAgICAgYXBwZWFyT25TY3JvbGxNb2JpbGVWaWV3Lm9ic2VydmUoZmFkZXIpO1xyXG4gICAgfSlcclxuXHJcbn0gZWxzZSB7XHJcbiAgICBjb25zdCBhcHBlYXJPblNjcm9sbCA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcywgYXBwZWFyT25TY3JvbGwpIHtcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYXBwZWFyJyk7XHJcbiAgICAgICAgICAgICAgICBhcHBlYXJPblNjcm9sbC51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgYXBwZWFyT3B0aW9ucyk7XHJcblxyXG4gICAgZmFkZXJzLmZvckVhY2goZmFkZXIgPT4ge1xyXG4gICAgICAgIGFwcGVhck9uU2Nyb2xsLm9ic2VydmUoZmFkZXIpO1xyXG4gICAgfSlcclxufVxyXG4iLCIvLyBoZWFkZXIgbW9kdWxlIiwiLy8gIyBNQUlOXHJcblxyXG4vLyBDVEEgXCJSRUFEIE1PUkVcIiBCdXR0b25cclxuLy8gVGFyZ2V0czpcclxuY29uc3QgcmVhZE1vcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVhZC1tb3JlLWJ0bicpO1xyXG5jb25zdCBtb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb3JlJyk7XHJcbmNvbnN0IGRvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZG90cycpO1xyXG5jb25zdCBkb3VibGVBcnJvd1N5bWJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb3VibGUtYXJyb3ctc3ltYm9sJyk7XHJcbmNvbnN0IENvbnRhaW5lclJlYWRNb3JlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lci1yZWFkLW1vcmUtYnRuJyk7XHJcblxyXG5jb25zdCB0aW1lbGluZVdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRpbWVsaW5lLXdyYXAnKTtcclxuXHJcbmNvbnN0IHRpbWVsaW5lQmdFbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUtYmctZG90LmVuZCcpO1xyXG5cclxuY29uc3QgdGltZWxpbmVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW1lbGluZS1pdGVtJyk7XHJcblxyXG5jb25zdCB0aW1lbGluZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUtaXRlbScpO1xyXG5jb25zdCBnYWxsZXJ5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnknKTtcclxuXHJcbi8vICMgXCJSRUFEIE1PUkVcIiBCdXR0b24gLSB0b2dnbGUgZnVuY3Rpb25cclxuLy8gY2hhbmdlIGJ1dHRvbiB0ZXh0XHJcbi8vIGNoYW5nZSBidXR0b24gcG9zaXRpb25cclxuZm9yIChsZXQgaSA9IDA7IGkgPCByZWFkTW9yZUJ0bi5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgbGV0IGlzT3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgcmVhZE1vcmVCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBtb3JlQ29udGVudCgpIHtcclxuXHJcbiAgICAgICAgaWYgKCFpc09wZW5lZCkge1xyXG4gICAgICAgICAgICBkb3RzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIG1vcmVUZXh0W2ldLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgcmVhZE1vcmVCdG5baV0uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZG91YmxlLWFycm93LXN5bWJvbFwiPiZsYXF1bzs8L3NwYW4+IFJFQUQgTEVTUyAnO1xyXG4gICAgICAgICAgICBDb250YWluZXJSZWFkTW9yZUJ0bltpXS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdmbGV4LWVuZCc7XHJcbiAgICAgICAgICAgIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICAgICAgZ2FsbGVyeUNvbnRhaW5lcltpXS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcblxyXG4gICAgICAgICAgICBpc09wZW5lZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyAqIE5PVEU6IHRpbWVsaW5lV3JhcHBlcnMgbGVuZ3RoIGFuZCByZWFkTW9yZUJ0biBsZW5ndGggYXJlIGRpZmZlcmVudCFcclxuICAgICAgICAgICAgaWYgKGkgPj0gNikge1xyXG4gICAgICAgICAgICAgICAgLy8gKiBIb3RmaXg6IHVucmVzcG9uc2l2ZSBjbGljayBldmVudCBsaXN0ZW5lciBmb3IgbGFzdCB0aW1lbGluZS1pdGVtXHJcbiAgICAgICAgICAgICAgICAvLyAqIFNpdHVhdGlvbjogVW5hYmxlIHRvIGNsb3NlXHJcbiAgICAgICAgICAgICAgICAvLyBDb25kdGlvbjogVGFyZ2V0IGxhc3QgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gcmVhZE1vcmVCdG4ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVXcmFwcGVyc1tpICsgMV0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2kgKyAxXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgZ2FsbGVyeUNvbnRhaW5lcltpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICogU3R5bGVzOiBHaXZlIHBhZGRpbmcgdG8gTkVYVCB0aW1lbGluZS13cmFwXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVXcmFwcGVyc1tpICsgMl0uY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2kgKyAxXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgQ29udGFpbmVyUmVhZE1vcmVCdG5baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBnYWxsZXJ5Q29udGFpbmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2ldLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBDb250YWluZXJSZWFkTW9yZUJ0bltpXSk7XHJcbiAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2ldLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBnYWxsZXJ5Q29udGFpbmVyW2ldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gKiBTaXR1YXRpb246IFtTdHlsZXMgYWRkaXRpb24gLyBob3RmaXhdXHJcbiAgICAgICAgICAgIC8vIGFkZCBhZXN0aGV0aWMgZm9yIGxhc3QgdHdvIGdhbGxlcnkgaW50ZXJhY3Rpb25cclxuICAgICAgICAgICAgaWYgKGkgPT0gcmVhZE1vcmVCdG4ubGVuZ3RoIC0gMikge1xyXG4gICAgICAgICAgICAgICAgdGltZWxpbmVCZ0VuZC5jbGFzc0xpc3QuYWRkKCdzcGVjaWFsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb3RzW2ldLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgbW9yZVRleHRbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgcmVhZE1vcmVCdG5baV0uaW5uZXJIVE1MID0gJ1JFQUQgTU9SRSA8c3BhbiBjbGFzcz1cImRvdWJsZS1hcnJvdy1zeW1ib2xcIj4mcmFxdW87PC9zcGFuPic7XHJcbiAgICAgICAgICAgIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnO1xyXG4gICAgICAgICAgICBDb250YWluZXJSZWFkTW9yZUJ0bltpXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGdhbGxlcnlDb250YWluZXJbaV0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgaXNPcGVuZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpID49IDYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IHJlYWRNb3JlQnRuLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAqIFVOTEVTUy4uLiBpZiB0aGUgcHJldmlvdXMgZWxlbWVudCBmb3IgdGhlIGxhc3QgdGltZWxpbmUgd3JhcHBlciBpcyBvcGVuLCBrZWVwIGNsYXNzIG9wZW4gKHRoZSBwYWRkaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVJdGVtc1tpICsgMV0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBnYWxsZXJ5Q29udGFpbmVyW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZUl0ZW1zW2kgKyAxXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVXcmFwcGVyc1tpICsgMl0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZUl0ZW1zW2kgKyAxXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGdhbGxlcnlDb250YWluZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lSXRlbXNbaSArIDFdLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgQ29udGFpbmVyUmVhZE1vcmVCdG5baV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lbGluZUl0ZW1zW2ldLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZ2FsbGVyeUNvbnRhaW5lcltpXSk7XHJcbiAgICAgICAgICAgICAgICB0aW1lbGluZUl0ZW1zW2ldLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgQ29udGFpbmVyUmVhZE1vcmVCdG5baV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAqIFNpdHVhdGlvbjogW1N0eWxlcyBhZGRpdGlvbiAvIGhvdGZpeF1cclxuICAgICAgICAgICAgLy8gYWRkIGFlc3RoZXRpYyBmb3IgbGFzdCB0d28gZ2FsbGVyeSBpbnRlcmFjdGlvblxyXG4gICAgICAgICAgICBpZiAoZ2FsbGVyeUNvbnRhaW5lcltyZWFkTW9yZUJ0bi5sZW5ndGggLSAyXS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmcgLy8gcmV0dXJuIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgdGltZWxpbmVXcmFwcGVyc1tpICsgMV0uY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gcmVhZE1vcmVCdG4ubGVuZ3RoIC0gMikge1xyXG4gICAgICAgICAgICAgICAgdGltZWxpbmVCZ0VuZC5jbGFzc0xpc3QucmVtb3ZlKCdzcGVjaWFsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vLyAjIEdBTExFUlkgU0VUVVBcclxuXHJcbmNvbnN0IG1xNjAwID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA2MDBweClcIik7XHJcbmNvbnN0IG1xMTAyNCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTAyNHB4KVwiKTtcclxuXHJcbmlmIChtcTYwMC5tYXRjaGVzKSB7XHJcbiAgICAvLyAjIE1PQklMRSBpbWFnZSBzaXplXHJcbiAgICBjb25zdCBnYWxsZXJ5UHJvcGVydHkgPSB7XHJcbiAgICAgICAgJzE4NTgnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDAsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hZ2UxMS1wYXJpcy0yMDl3LmpwZycsICdpbWFnZXMvQmlydGhwbGFjZS1mcm9tLXdlc3Qtc21sLTYwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCAxMSB5ZWFycyBvbGQgYXQgUGFyaXMuJywgJ01hbmhhdHRhbiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiAxMSB5ZWFycyBvbGQuIChQYXJpcyknLCAnTWFuaGF0dGFuLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg3OSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWF2aWQtYm94ZXItYXQtaGFydmFyZC1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IHNpdHRpbmcgZG93biB3aXRoIGhpcyBhcm1zIGNyb3NzZWQuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIGFuIGF2aWQgYm94ZXJhbmQgd3Jlc3RsZXIuIChIYXJ2YXJkKSddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg4MCc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMixcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3doaXRlLWhvdXNlLXBvcnRyYWl0LXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydQb3J0cmFpdCBvZiBUaGVvZG9yZSBSb29zZXZlbHQgcGFpbnRlZCBieSBKb2huIFNpbmdlciBTYXJnZW50LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVGhpcyBvZmZpY2lhbCBwb3J0cmFpdCBvZiBUaGVvZG9yZSBSb29zZXZlbHQgd2FzIHBhaW50ZWQgYnkgSm9obiBTaW5nZXIgU2FyZ2VudC4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODEnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDMsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy9yb29zZXZlbHQtcmVhZGluZy1zbWwtNjAwdy5qcGcnLCAnaW1hZ2VzL3RyLXdyaXRpbmdzLXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgc2l0dGluZyB3aXRoIGEgYm9vayBvbiBoaXMgaGFuZC4nLCAnQSBjb2xsZWN0aW9uIG9mIFRoZW9kb3JlXFwncyBib29rcyBvbiB0aGUgc2hlbGYnXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gc2l0dGluZyB3aXRoIGEgYm9vayBvbiBoaXMgaGFuZC4nLCAnVC5SLiBib29rcyBoZSBoYXMgd3JpdHRlbi4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODQnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDQsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1tb3RoZXItYW5kLWZpcnN0LXdpZmUtc21sLTYwMHcuanBnJywgJ2ltYWdlcy90ci1zaGVyaWYtc21sLTYwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdFxcJ3MgbW90aGVyIGFuZCB3aWZlLicsICdUaGVvZG9yZSBSb29zZXZlbHQgaW4gc2hlcmlmXFwncyB1bmlmb3JtJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuXFwncyBtb3RoZXIgKGxlZnQpIGFuZCBoaXMgZmlyc3Qgd2lmZSAocmlnaHQpLicsICdULlIuIGFzIGEgc2hlcmlmLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg4Nic6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWhvcnNlLXNtbC02MDB3LmpwZycsICdpbWFnZXMvdHItbmV3LWZhbWlseS1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IG9uIGEgaG9yc2UuJywgJ1RoZW9kb3JlIFJvb3NldmVsdCBhbmQgaGlzIG5ldyBmYW1pbHkuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIHdyaXRpbmcgYXQgYSBkZXNrLicsICdULlIuIGZhbWlseS4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4OTUnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDYsXHJcbiAgICAgICAgICAgICd1cmwnOiBudWxsLFxyXG4gICAgICAgICAgICAnYWx0JzogbnVsbCxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg5Nyc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNyxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3NwYW5pc2gtdnMtYW1lcmljYW5zLXNtbC02MDB3LmpwZycsICdpbWFnZXMvcm91Z2gtcmlkZXJzLXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydBIHBhaW50aW5nIG9mIHRoZSBBc2lhdGljIFNxdWFkcm9uIGRlc3Ryb3lpbmcgU3BhbmlzaCBmbGVldCBpbiBCYXR0bGUgb2YgTWFuaWxhIEJheS4nLCAnQSBncm91cCBvZiBwZW9wbGUga25vd24gYXMgdGhlIFJvdWdoIFJpZGVycyddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnQXNpYXRpYyBTcXVhZHJvbiBkZXN0cm95aW5nIFNwYW5pc2ggZmxlZXQgaW4gQmF0dGxlIG9mIE1hbmlsYSBCYXkgb24gTWF5IDEgMTg5OCcsICdSb3VnaCBSaWRlcnMnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MDEnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDgsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hdC1jaGljYWdvLXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgYXQgQ2hpY2Fnby4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gYXQgQ2hpY2Fnby4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MDknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDksXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1zYWZhcmktc21sLTYwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBzdGFuZGluZyBuZXh0IHRvIHRoZSBlbGVwaGFudCBoZSBzaG90IG9uIHNhZmFyaS4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUiBzdGFuZGluZyBuZXh0IHRvIHRoZSBlbGVwaGFudCBoZSBzaG90IG9uIHNhZmFyaS4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MTAnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEwLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItYW5kLXRhZnQtc21sLTYwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBhbmQgVGFmdC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUiAobGVmdCkgYW5kIFRhZnQgKHJpZ2h0KS4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MTInOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDExLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItbWVkaWNhbC14cmF5LXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgbWVkaWNhbCB4LXJheSBvbiBPY3RvYmVyIDE0IGFmdGVyIHRoZSBhc3Nhc3NpbmF0aW9uIGF0dGVtcHQsIHNob3dpbmcgdGhlIGJ1bGxldC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gbWVkaWNhbCB4LXJheSBvbiBPY3RvYmVyIDE0IGFmdGVyIHRoZSBhc3Nhc3NpbmF0aW9uIGF0dGVtcHQsIHNob3dpbmcgdGhlIGJ1bGxldC4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MTknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEyLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItdG9tYi1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0XFwncyBncmF2ZS4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi5cXCdzIGdyYXZlLCBPeXN0ZXIgQmF5LCBOZXcgWW9yay4nXVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY3JlYXRlR2FsbGVyeShnYWxsZXJ5UHJvcGVydHkpO1xyXG59IGVsc2UgaWYgKG1xMTAyNC5tYXRjaGVzKSB7XHJcbiAgICAvLyAjIFRBQkxFVCBpbWFnZSBzaXplXHJcbiAgICBjb25zdCBnYWxsZXJ5UHJvcGVydHkgPSB7XHJcbiAgICAgICAgJzE4NTgnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDAsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hZ2UxMS1wYXJpcy0yMDl3LmpwZycsICdpbWFnZXMvQmlydGhwbGFjZS1mcm9tLXdlc3QtbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgMTEgeWVhcnMgb2xkIGF0IFBhcmlzLicsICdNYW5oYXR0YW4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gMTEgeWVhcnMgb2xkLiAoUGFyaXMpJywgJ01hbmhhdHRhbi4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4NzknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hdmlkLWJveGVyLWF0LWhhcnZhcmQtbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgc2l0dGluZyBkb3duIHdpdGggaGlzIGFybXMgY3Jvc3NlZC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gYW4gYXZpZCBib3hlcmFuZCB3cmVzdGxlci4gKEhhcnZhcmQpJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODgwJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAyLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvd2hpdGUtaG91c2UtcG9ydHJhaXQtbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydQb3J0cmFpdCBvZiBUaGVvZG9yZSBSb29zZXZlbHQgcGFpbnRlZCBieSBKb2huIFNpbmdlciBTYXJnZW50LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVGhpcyBvZmZpY2lhbCBwb3J0cmFpdCBvZiBUaGVvZG9yZSBSb29zZXZlbHQgd2FzIHBhaW50ZWQgYnkgSm9obiBTaW5nZXIgU2FyZ2VudC4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODEnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDMsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy9yb29zZXZlbHQtcmVhZGluZy0xMDAwdy5qcGcnLCAnaW1hZ2VzL3RyLXdyaXRpbmdzLW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IHNpdHRpbmcgd2l0aCBhIGJvb2sgb24gaGlzIGhhbmQuJywgJ0EgY29sbGVjdGlvbiBvZiBUaGVvZG9yZVxcJ3MgYm9va3Mgb24gdGhlIHNoZWxmJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIHNpdHRpbmcgd2l0aCBhIGJvb2sgb24gaGlzIGhhbmQuJywgJ1QuUi4gYm9va3MgaGUgaGFzIHdyaXR0ZW4uJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODg0Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA0LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItbW90aGVyLWFuZC1maXJzdC13aWZlLTEwNjV3LmpwZycsICdpbWFnZXMvdHItc2hlcmlmLTgwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdFxcJ3MgbW90aGVyIGFuZCB3aWZlLicsICdUaGVvZG9yZSBSb29zZXZlbHQgaW4gc2hlcmlmXFwncyB1bmlmb3JtJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuXFwncyBtb3RoZXIgKGxlZnQpIGFuZCBoaXMgZmlyc3Qgd2lmZSAocmlnaHQpLicsICdULlIuIGFzIGEgc2hlcmlmLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg4Nic6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWhvcnNlLW1lZC0xMDI0dy5qcGcnLCAnaW1hZ2VzL3RyLW5ldy1mYW1pbHktbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgb24gYSBob3JzZS4nLCAnVGhlb2RvcmUgUm9vc2V2ZWx0IGFuZCBoaXMgbmV3IGZhbWlseS4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gd3JpdGluZyBhdCBhIGRlc2suJywgJ1QuUi4gZmFtaWx5LiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg5NSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNixcclxuICAgICAgICAgICAgJ3VybCc6IG51bGwsXHJcbiAgICAgICAgICAgICdhbHQnOiBudWxsLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODk3Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA3LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvc3BhbmlzaC12cy1hbWVyaWNhbnMtbWVkLTEwMjR3LmpwZycsICdpbWFnZXMvcm91Z2gtcmlkZXJzLW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnQSBwYWludGluZyBvZiB0aGUgQXNpYXRpYyBTcXVhZHJvbiBkZXN0cm95aW5nIFNwYW5pc2ggZmxlZXQgaW4gQmF0dGxlIG9mIE1hbmlsYSBCYXkuJywgJ0EgZ3JvdXAgb2YgcGVvcGxlIGtub3duIGFzIHRoZSBSb3VnaCBSaWRlcnMnXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ0FzaWF0aWMgU3F1YWRyb24gZGVzdHJveWluZyBTcGFuaXNoIGZsZWV0IGluIEJhdHRsZSBvZiBNYW5pbGEgQmF5IG9uIE1heSAxIDE4OTgnLCAnUm91Z2ggUmlkZXJzJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTAxJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA4LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItYXQtY2hpY2Fnby1tZWQtMTAyNHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBhdCBDaGljYWdvLiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiBhdCBDaGljYWdvLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTkwOSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogOSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLXNhZmFyaS1tZWQtMTAyNHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBzdGFuZGluZyBuZXh0IHRvIHRoZSBlbGVwaGFudCBoZSBzaG90IG9uIHNhZmFyaS4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUiBzdGFuZGluZyBuZXh0IHRvIHRoZSBlbGVwaGFudCBoZSBzaG90IG9uIHNhZmFyaS4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MTAnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEwLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItYW5kLXRhZnQtbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgYW5kIFRhZnQuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIgKGxlZnQpIGFuZCBUYWZ0IChyaWdodCkuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTEyJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxMSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLW1lZGljYWwteHJheS1tZWQtMTAyNHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBtZWRpY2FsIHgtcmF5IG9uIE9jdG9iZXIgMTQgYWZ0ZXIgdGhlIGFzc2Fzc2luYXRpb24gYXR0ZW1wdCwgc2hvd2luZyB0aGUgYnVsbGV0LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiBtZWRpY2FsIHgtcmF5IG9uIE9jdG9iZXIgMTQgYWZ0ZXIgdGhlIGFzc2Fzc2luYXRpb24gYXR0ZW1wdCwgc2hvd2luZyB0aGUgYnVsbGV0LiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTkxOSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMTIsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci10b21iLW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0XFwncyBncmF2ZS4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi5cXCdzIGdyYXZlLCBPeXN0ZXIgQmF5LCBOZXcgWW9yay4nXVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY3JlYXRlR2FsbGVyeShnYWxsZXJ5UHJvcGVydHkpO1xyXG59IGVsc2Uge1xyXG4gICAgLy8gIyBERVNLVE9QIChvciBoaWdoZXIpIGltYWdlIHNpemVcclxuICAgIGNvbnN0IGdhbGxlcnlQcm9wZXJ0eSA9IHtcclxuICAgICAgICAnMTg1OCc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMCxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWFnZTExLXBhcmlzLTIwOXcuanBnJywgJ2ltYWdlcy9CaXJ0aHBsYWNlLWZyb20td2VzdC1sZ2UtMTI4MHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCAxMSB5ZWFycyBvbGQgYXQgUGFyaXMuJywgJ01hbmhhdHRhbiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiAxMSB5ZWFycyBvbGQuIChQYXJpcyknLCAnTWFuaGF0dGFuLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg3OSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWF2aWQtYm94ZXItYXQtaGFydmFyZC1sZ2UtMTI4MHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBzaXR0aW5nIGRvd24gd2l0aCBoaXMgYXJtcyBjcm9zc2VkLiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiBhbiBhdmlkIGJveGVyYW5kIHdyZXN0bGVyLiAoSGFydmFyZCknXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODAnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDIsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy93aGl0ZS1ob3VzZS1wb3J0cmFpdC1sZ2UtMTI4MHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1BvcnRyYWl0IG9mIFRoZW9kb3JlIFJvb3NldmVsdCBwYWludGVkIGJ5IEpvaG4gU2luZ2VyIFNhcmdlbnQuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydUaGlzIG9mZmljaWFsIHBvcnRyYWl0IG9mIFRoZW9kb3JlIFJvb3NldmVsdCB3YXMgcGFpbnRlZCBieSBKb2huIFNpbmdlciBTYXJnZW50LiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg4MSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMyxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3Jvb3NldmVsdC1yZWFkaW5nLTEwMDB3LmpwZycsICdpbWFnZXMvdHItd3JpdGluZ3MtbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgc2l0dGluZyB3aXRoIGEgYm9vayBvbiBoaXMgaGFuZC4nLCAnQSBjb2xsZWN0aW9uIG9mIFRoZW9kb3JlXFwncyBib29rcyBvbiB0aGUgc2hlbGYnXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gc2l0dGluZyB3aXRoIGEgYm9vayBvbiBoaXMgaGFuZC4nLCAnVC5SLiBib29rcyBoZSBoYXMgd3JpdHRlbi4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODQnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDQsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1tb3RoZXItYW5kLWZpcnN0LXdpZmUtMTA2NXcuanBnJywgJ2ltYWdlcy90ci1zaGVyaWYtODAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0XFwncyBtb3RoZXIgYW5kIHdpZmUuJywgJ1RoZW9kb3JlIFJvb3NldmVsdCBpbiBzaGVyaWZcXCdzIHVuaWZvcm0nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi5cXCdzIG1vdGhlciAobGVmdCkgYW5kIGhpcyBmaXJzdCB3aWZlIChyaWdodCkuJywgJ1QuUi4gYXMgYSBzaGVyaWYuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODg2Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA1LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItaG9yc2UtbGdlLTEyODB3LmpwZycsICdpbWFnZXMvdHItbmV3LWZhbWlseS1sZ2UtMTI4MHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBvbiBhIGhvcnNlLicsICdUaGVvZG9yZSBSb29zZXZlbHQgYW5kIGhpcyBuZXcgZmFtaWx5LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiB3cml0aW5nIGF0IGEgZGVzay4nLCAnVC5SLiBmYW1pbHkuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODk1Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA2LFxyXG4gICAgICAgICAgICAndXJsJzogbnVsbCxcclxuICAgICAgICAgICAgJ2FsdCc6IG51bGwsXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4OTcnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDcsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy9zcGFuaXNoLXZzLWFtZXJpY2Fucy1sZ2UtMTI4MHcuanBnJywgJ2ltYWdlcy9yb3VnaC1yaWRlcnMtMTE0NHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ0EgcGFpbnRpbmcgb2YgdGhlIEFzaWF0aWMgU3F1YWRyb24gZGVzdHJveWluZyBTcGFuaXNoIGZsZWV0IGluIEJhdHRsZSBvZiBNYW5pbGEgQmF5LicsICdBIGdyb3VwIG9mIHBlb3BsZSBrbm93biBhcyB0aGUgUm91Z2ggUmlkZXJzJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydBc2lhdGljIFNxdWFkcm9uIGRlc3Ryb3lpbmcgU3BhbmlzaCBmbGVldCBpbiBCYXR0bGUgb2YgTWFuaWxhIEJheSBvbiBNYXkgMSAxODk4JywgJ1JvdWdoIFJpZGVycyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTkwMSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogOCxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWF0LWNoaWNhZ28tbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgYXQgQ2hpY2Fnby4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gYXQgQ2hpY2Fnby4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MDknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDksXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1zYWZhcmktbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgc3RhbmRpbmcgbmV4dCB0byB0aGUgZWxlcGhhbnQgaGUgc2hvdCBvbiBzYWZhcmkuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIgc3RhbmRpbmcgbmV4dCB0byB0aGUgZWxlcGhhbnQgaGUgc2hvdCBvbiBzYWZhcmkuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTEwJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxMCxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWFuZC10YWZ0LWxnZS0xMjgwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IGFuZCBUYWZ0LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SIChsZWZ0KSBhbmQgVGFmdCAocmlnaHQpLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTkxMic6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMTEsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1tZWRpY2FsLXhyYXktbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgbWVkaWNhbCB4LXJheSBvbiBPY3RvYmVyIDE0IGFmdGVyIHRoZSBhc3Nhc3NpbmF0aW9uIGF0dGVtcHQsIHNob3dpbmcgdGhlIGJ1bGxldC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gbWVkaWNhbCB4LXJheSBvbiBPY3RvYmVyIDE0IGFmdGVyIHRoZSBhc3Nhc3NpbmF0aW9uIGF0dGVtcHQsIHNob3dpbmcgdGhlIGJ1bGxldC4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MTknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEyLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItdG9tYi1tZWQtMTAyNHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdFxcJ3MgZ3JhdmUuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuXFwncyBncmF2ZSwgT3lzdGVyIEJheSwgTmV3IFlvcmsuJ11cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNyZWF0ZUdhbGxlcnkoZ2FsbGVyeVByb3BlcnR5KTtcclxufVxyXG4vLyB0b3RhbCB4MTMgdGltZWxpbmUgaXRlbXNcclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVHYWxsZXJ5KGdhbGxlcnlQcm9wZXJ0eSkge1xyXG4gICAgZm9yIChsZXQga2V5IGluIGdhbGxlcnlQcm9wZXJ0eSkge1xyXG4gICAgICAgIC8vICMgQ3JlYXRlICcuZ2FsbGVyeV9fY29udGVudCcsXHJcbiAgICAgICAgLy8gJy5nYWxsZXJ5X19pbWFnZScsXHJcbiAgICAgICAgLy8gJ2dhbGxlcnlfX3RleHQnLFxyXG4gICAgICAgIC8vICdwJyBlbGVtZW50LFxyXG4gICAgICAgIC8vICMgQ3JlYXRlIGFuIEV2ZW50IExpc3RlbmVyXHJcbiAgICAgICAgLy8gdGV4dE5vZGUgYWx0IHRleHQgZm9yIGVhY2ggaW1hZ2UgW1N0b3JhZ2VdID4+IEFkZCBFdmVudCBMaXN0ZW5lclxyXG4gICAgICAgIC8vIHRleHROb2RlIGZpZ2NhcHRpb24gZm9yIGVhY2ggaW1hZ2UgW1N0b3JhZ2VdID4+IEFkZCBFdmVudCBMaXN0ZW5lclxyXG4gICAgICAgIC8vIGltYWdlcyBmb3IgZWFjaCBpbWFnZSBbU3RvcmFnZV0gPj4gQWRkIEV2ZW50IExpc3RlbmVyXHJcbiAgICAgICAgLy8gIyBDcmVhdCBJRiBjb25kaXRpb24gaXMgbWV0XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBpbWFnZSB1cmwgc3RvcmVkXHJcbiAgICAgICAgLy8gQ3JlYXRlIHNwYW4gVGFncyBmb3IgZG90IGluZGljYXRvcnNcclxuICAgICAgICAvLyBBZGQgRXZlbnQgTGlzdGVuZXJcclxuICAgICAgICAvLyBXaGVuICdjbGljaycgc2hvdyBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgLy8gZnVuY3Rpb24gY3VycmVudFNsaWRlKClcclxuICAgICAgICAvLyBDcmVhdGUgcHJldiAvIG5leHQgYnV0dG9uIHRvIGxvb2sgdGhyb3VnaCBpbWFnZXNcclxuICAgICAgICAvLyBBZGQgRXZlbnQgTGlzdGVuZXJcclxuICAgICAgICAvLyBXaGVuICdjbGljaycgbW92ZSBwcmV2aW91cyBvciBuZXh0XHJcbiAgICAgICAgLy8gRGlzYWJsZSAgcHJldiAvIG5leHQgd2hlbiBhdCB0aGUgZW5kIG9yIGJlZ2lubmluZyBvZiBsZW5ndGguXHJcblxyXG4gICAgICAgIC8vICEgV0lQIC0gTmVlZCB0byBza2lwIHRoaXMgdGV4dCBzZWN0aW9uIHRvIGRpc3BsYXkgaW1hZ2VzID4+XHJcbiAgICAgICAgaWYgKGtleSA9PSAnMTg5NScpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2luZGV4J10gPT09IDYpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vICEgPDxcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlICcuZ2FsbGVyeV9fY29udGVudCdcclxuICAgICAgICBsZXQgZ2FsbGVyeUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBnYWxsZXJ5Q29udGVudC5jbGFzc05hbWUgPSAnZ2FsbGVyeV9fY29udGVudCc7XHJcbiAgICAgICAgLy8gQ3JlYXRlICcuZ2FsbGVyeV9faW1hZ2UnXHJcbiAgICAgICAgbGV0IGdhbGxlcnlJbWFnZVNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGdhbGxlcnlJbWFnZVNsaWRlci5jbGFzc05hbWUgPSAnZ2FsbGVyeV9faW1hZ2UnO1xyXG4gICAgICAgIC8vIENyZWF0ZSAnLmdhbGxlcnlfX3RleHQnXHJcbiAgICAgICAgbGV0IGdhbGxlcnlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZ2FsbGVyeVRleHQuY2xhc3NOYW1lID0gJ2dhbGxlcnlfX3RleHQnO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgJ3AnIGVsZW1lbnRcclxuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAvLyBDcmVhdGUgJ2ltYWdlJyBlbGVtZW50XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIC8vIENyZWF0ZSB0ZXh0Tm9kZSBmb3IgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGFycmF5XHJcbiAgICAgICAgbGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2ZpZ2NhcHRpb24nXVswXSk7XHJcblxyXG4gICAgICAgIC8vIFNldCB1cCBmaXJzdCBpbWFnZSB0byBkaXNwbGF5IGFzIGRlZmF1bHRcclxuICAgICAgICAvLyBBcHBlbmQgaW1hZ2VzXHJcbiAgICAgICAgaW1hZ2VzLnNyYyA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWyd1cmwnXVswXTtcclxuICAgICAgICBpbWFnZXMuYWx0ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2FsdCddWzBdO1xyXG5cclxuICAgICAgICAvLyAjIEFwcGVuZCB0aGUgd2hvbGUgZ2FsbGVyeSBjb250ZW50IHRvZ2V0aGVyXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2luZGV4J107XHJcblxyXG4gICAgICAgIC8vICogQ29uZGl0aW9uIGZvciB0aGUgNnRoIG9ubHkgdGV4dCBtYWludGVuYW5jZVxyXG4gICAgICAgIGlmIChpbmRleCA+PSA2KSB7XHJcbiAgICAgICAgICAgIGdhbGxlcnlDb250YWluZXJbaW5kZXggLSAxXS5hcHBlbmRDaGlsZChnYWxsZXJ5Q29udGVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2FsbGVyeUNvbnRhaW5lcltpbmRleF0uYXBwZW5kQ2hpbGQoZ2FsbGVyeUNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2FsbGVyeUNvbnRlbnQuYXBwZW5kQ2hpbGQoZ2FsbGVyeUltYWdlU2xpZGVyKTtcclxuICAgICAgICBnYWxsZXJ5SW1hZ2VTbGlkZXIuYXBwZW5kQ2hpbGQoaW1hZ2VzKTtcclxuICAgICAgICBnYWxsZXJ5Q29udGVudC5hcHBlbmRDaGlsZChnYWxsZXJ5VGV4dCk7XHJcbiAgICAgICAgZ2FsbGVyeVRleHQuYXBwZW5kQ2hpbGQodGV4dCk7XHJcbiAgICAgICAgdGV4dC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBnYWxsZXJ5IEltYWdlU2xpZGUgZnVuY3Rpb24gaWYgY29uZGl0aW9ucyBhcmUgbWV0XHJcbiAgICAgICAgLy8gSWYgJ3VybCcgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiAxXHJcbiAgICAgICAgaWYgKGdhbGxlcnlQcm9wZXJ0eVtrZXldWyd1cmwnXS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBwcmV2IC8gbmV4dCBidXR0b25cclxuICAgICAgICAgICAgbGV0IHByZXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgIHByZXZCdG4uY2xhc3NOYW1lID0gJ3ByZXYnO1xyXG4gICAgICAgICAgICBsZXQgbmV4dEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgbmV4dEJ0bi5jbGFzc05hbWUgPSAnbmV4dCc7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgcHJldiAvIG5leHQgYmFja2dyb3VuZCBmb3IgYnV0dG9uLCBhbmQgYWRkIGNsYXNzXHJcbiAgICAgICAgICAgIGxldCBwcmV2QnRuQmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHByZXZCdG5CZy5jbGFzc05hbWUgPSAncHJldi1idG4tYmcnO1xyXG4gICAgICAgICAgICBsZXQgbmV4dEJ0bkJnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICBuZXh0QnRuQmcuY2xhc3NOYW1lID0gJ25leHQtYnRuLWJnJztcclxuXHJcbiAgICAgICAgICAgIC8vIEluc2VydCBidXR0b24gdG8gYmcgYnV0dG9uXHJcbiAgICAgICAgICAgIHByZXZCdG5CZy5hcHBlbmRDaGlsZChwcmV2QnRuKTtcclxuICAgICAgICAgICAgbmV4dEJ0bkJnLmFwcGVuZENoaWxkKG5leHRCdG4pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNsaWRlSW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGRvdCBjb250YWluZXJcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRvdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRG90cy5jbGFzc05hbWUgPSAnY29udGFpbmVyLWRvdHMnO1xyXG5cclxuICAgICAgICAgICAgLy8gQWxsIHRoZSBkb3QgaW5kaWNhdG9yIHN0b3JlZCBmb3IgZWFjaCBnYWxsZXJ5IHNlY3Rpb25cclxuICAgICAgICAgICAgbGV0IGRvdEFyciA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGRvdHMgKGFzIG1hbnkgYXMgdGhlIGltYWdlcyBleGlzdClcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ10ubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGRvdEFycltqXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIGRvdEFycltqXS5jbGFzc05hbWUgPSAnZG90JztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgY2xhc3MgJy5hY3RpdmUnIHRvIHRoZSBmaXJzdCBpbWFnZSBvbiBkaXNwbGF5XHJcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90QXJyW2pdLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBFdmVudCBMaXN0ZW5lciBmb3IgZG90IGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgLy8gaWYgYSBkb3QgaXMgc2VsZWN0ZWQsIGFkZCBjbGFzcyAnLmFjdGl2ZSdcclxuICAgICAgICAgICAgICAgIC8vIGFuZCByZW1vdmUgb3RoZXIgZG90cyBvZiB0aGF0IGNsYXNzXHJcbiAgICAgICAgICAgICAgICBkb3RBcnJbal0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRvZ2dsZSBhZGQvcmVtb3ZlIGNsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgZG90QXJyW2pdLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY2xhc3MgJy5hY3RpdmUnIGZyb20gb3RoZXIgZG90KHMpIHRoYW4gdGhlIG9uZSBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1bnNlbGVjdGVkID0gZG90QXJyLmZpbHRlcihmdW5jdGlvbiAoZWxlbSkgeyByZXR1cm4gZWxlbSAhPT0gZG90QXJyW2pdOyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB1bnNlbGVjdGVkLmxlbmd0aDsgeCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuc2VsZWN0ZWRbeF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgU2xpZGVyIEluZGV4IGFuZCBpbWFnZSBvbiBkaXNwbGF5XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLnNyYyA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWyd1cmwnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXMuYWx0ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2FsdCddW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsnZmlnY2FwdGlvbiddW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRG90cy5hcHBlbmRDaGlsZChkb3RBcnJbal0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgRXZlbnQgTGlzdGVuZXJcclxuICAgICAgICAgICAgcHJldkJ0bkJnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uZGl0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ10ubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLnNyYyA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWyd1cmwnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXMuYWx0ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2FsdCddW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsnZmlnY2FwdGlvbiddW3NsaWRlSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgZG90IGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50RG90QXJyID0gY29udGFpbmVyRG90cy5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY29udGFpbmVyRG90cy5jaGlsZE5vZGVzLmxlbmd0aDsgeSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnREb3RBcnJbeV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA9PSBzbGlkZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG90QXJyW3ldLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4LS07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoYW5nZSBpbWFnZSB1cmwsIGFsdCB0ZXh0IGFuZCBmaWdjYXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLnNyYyA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWyd1cmwnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXMuYWx0ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2FsdCddW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsnZmlnY2FwdGlvbiddW3NsaWRlSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgZG90IGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50RG90QXJyID0gY29udGFpbmVyRG90cy5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY29udGFpbmVyRG90cy5jaGlsZE5vZGVzLmxlbmd0aDsgeSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnREb3RBcnJbeV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA9PSBzbGlkZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG90QXJyW3ldLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG5leHRCdG5CZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbmRpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPT09IGdhbGxlcnlQcm9wZXJ0eVtrZXldWyd1cmwnXS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5zcmMgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ11bc2xpZGVJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLmFsdCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydhbHQnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2ZpZ2NhcHRpb24nXVtzbGlkZUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIGRvdCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERvdEFyciA9IGNvbnRhaW5lckRvdHMuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNvbnRhaW5lckRvdHMuY2hpbGROb2Rlcy5sZW5ndGg7IHkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG90QXJyW3ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gc2xpZGVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudERvdEFyclt5XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCsrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXMuc3JjID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ3VybCddW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5hbHQgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsnYWx0J11bc2xpZGVJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydmaWdjYXB0aW9uJ11bc2xpZGVJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoYW5nZSBkb3QgaW5kaWNhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREb3RBcnIgPSBjb250YWluZXJEb3RzLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjb250YWluZXJEb3RzLmNoaWxkTm9kZXMubGVuZ3RoOyB5ICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudERvdEFyclt5XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ID09IHNsaWRlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnREb3RBcnJbeV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIGRvdC1pbmRpY2F0b3IgY29udGFpbmVyLCBkb3RzLCBwcmV2IGJ1dHRvbiwgbmV4dCBidXR0b25cclxuICAgICAgICAgICAgZ2FsbGVyeUltYWdlU2xpZGVyLmFwcGVuZENoaWxkKGNvbnRhaW5lckRvdHMpO1xyXG4gICAgICAgICAgICBnYWxsZXJ5SW1hZ2VTbGlkZXIuYXBwZW5kQ2hpbGQocHJldkJ0bkJnKTtcclxuICAgICAgICAgICAgZ2FsbGVyeUltYWdlU2xpZGVyLmFwcGVuZENoaWxkKG5leHRCdG5CZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuIl19
