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

console.log("Initiating animation"); // ! Safari does not support 'Intersection Observer', use polyfill

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
      console.log("open" + i);
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
      console.log('close');
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
      // * LOGGING
      console.log('Pass condition: Skip 2', 'Creating gallery', galleryProperty[key]['index'], key);
      return "continue";
    } // ! <<
    // Create '.gallery__content'


    var galleryContent = document.createElement('div');
    galleryContent.className = 'gallery__content'; // Create '.gallery__image'

    var galleryImageSlider = document.createElement('div');
    galleryImageSlider.className = 'gallery__image'; // Create '.gallery__text'

    var galleryText = document.createElement('div');
    galleryText.className = 'gallery__text';
    console.log(galleryProperty[key]['url'][0]); // Create 'p' element

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFuaW1hdGlvbnMvb25zY3JvbGwuanMiLCJtb2R1bGVzL2hlYWRlci5qcyIsIm1vZHVsZXMvbWFpbi5qcyJdLCJuYW1lcyI6WyJuYXZpZ2F0b3IiLCJjb25zb2xlIiwibG9nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInRoZW4iLCJyZWciLCJlcnIiLCJtcTYwMCIsIm1hdGNoTWVkaWEiLCJtcTEwMjQiLCJmYWRlcnMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzbGlkZXJzIiwicmV2ZWFsZXJzIiwiYXBwZWFyT3B0aW9ucyIsInRocmVzaG9sZCIsInJvb3RNYXJnaW4iLCJhcHBlYXJPcHRpb25zTW9iaWxlVmlldyIsInJldmVhbE9wdGlvbnMiLCJzbGlkZXJPcHRpb25zIiwicmV2ZWFsT25TY3JvbGxNb2JpbGVWaWV3IiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1bm9ic2VydmUiLCJzbGlkZU9uU2Nyb2xsTW9iaWxlVmlldyIsInJldmVhbGVyIiwib2JzZXJ2ZSIsInNsaWRlciIsIm1hdGNoZXMiLCJhcHBlYXJPblNjcm9sbE1vYmlsZVZpZXciLCJhcHBlYXJPblNjcm9sbCIsImZhZGVyIiwicmVhZE1vcmVCdG4iLCJtb3JlVGV4dCIsImRvdHMiLCJkb3VibGVBcnJvd1N5bWJvbCIsIkNvbnRhaW5lclJlYWRNb3JlQnRuIiwidGltZWxpbmVXcmFwcGVycyIsInRpbWVsaW5lQmdFbmQiLCJxdWVyeVNlbGVjdG9yIiwidGltZWxpbmVJdGVtcyIsInRpbWVsaW5lSXRlbSIsImdhbGxlcnlDb250YWluZXIiLCJpIiwiaXNPcGVuZWQiLCJtb3JlQ29udGVudCIsInN0eWxlIiwiZGlzcGxheSIsImlubmVySFRNTCIsImp1c3RpZnlDb250ZW50IiwibGVuZ3RoIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwicmVtb3ZlIiwiY29udGFpbnMiLCJnYWxsZXJ5UHJvcGVydHkiLCJjcmVhdGVHYWxsZXJ5Iiwia2V5IiwiZ2FsbGVyeUNvbnRlbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZ2FsbGVyeUltYWdlU2xpZGVyIiwiZ2FsbGVyeVRleHQiLCJ0ZXh0IiwiaW1hZ2VzIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsInNyYyIsImFsdCIsImluZGV4IiwiYXBwZW5kQ2hpbGQiLCJwcmV2QnRuIiwibmV4dEJ0biIsInByZXZCdG5CZyIsIm5leHRCdG5CZyIsInNsaWRlSW5kZXgiLCJjb250YWluZXJEb3RzIiwiZG90QXJyIiwiaiIsInRvZ2dsZSIsInVuc2VsZWN0ZWQiLCJmaWx0ZXIiLCJlbGVtIiwieCIsInRleHRDb250ZW50IiwiY3VycmVudERvdEFyciIsImNoaWxkTm9kZXMiLCJ5Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSSxtQkFBbUJBLFNBQXZCLEVBQWtDO0FBQzlCQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBQyxFQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDcENKLElBQUFBLFNBQVMsQ0FBQ0ssYUFBVixDQUNHQyxRQURILENBQ1ksT0FEWixFQUVHQyxJQUZILENBRVEsVUFBQ0MsR0FBRDtBQUFBLGFBQVNQLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaLENBQVQ7QUFBQSxLQUZSLFdBR1MsVUFBQ08sR0FBRDtBQUFBLGFBQVNSLE9BQU8sQ0FBQ0MsR0FBUixrQ0FBc0NPLEdBQXRDLEVBQVQ7QUFBQSxLQUhUO0FBSUQsR0FMRDtBQU1EOzs7QUNUSFIsT0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVosRSxDQUVBOztBQUVBLElBQU1RLEtBQUssR0FBR1AsTUFBTSxDQUFDUSxVQUFQLENBQWtCLG9CQUFsQixDQUFkO0FBQ0EsSUFBTUMsTUFB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Q0g7QUFDSjtBQUNKO0FBQ0osU0FuQ0QsRUFuR3dDLENBd0l4Qzs7QUFDQXNDLFFBQUFBLGtCQUFrQixDQUFDUyxXQUFuQixDQUErQk0sYUFBL0I7QUFDQWYsUUFBQUEsa0JBQWtCLENBQUNTLFdBQW5CLENBQStCRyxTQUEvQjtBQUNBWixRQUFBQSxrQkFBa0IsQ0FBQ1MsV0FBbkIsQ0FBK0JJLFNBQS9CO0FBM0l3QztBQTRJM0M7QUF2TitCOztBQUNwQyxPQUFLLElBQUlqQixHQUFULElBQWdCRixlQUFoQixFQUFpQztBQUFBLHNCQUF4QkUsR0FBd0I7O0FBQUEsNkJBNEJ6QjtBQTRMUDtBQUNKIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNlcnZpY2UgV29ya2VyXHJcbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiU1cgaXMgc3VwcG9ydGVkXCIpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcclxuICAgICAgICAucmVnaXN0ZXIoXCJzdy5qc1wiKVxyXG4gICAgICAgIC50aGVuKChyZWcpID0+IGNvbnNvbGUubG9nKFwiU2VydmljZSBXb3JrZXI6IFJlZ2lzdGVyZWRcIikpXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGBTZXJ2aWNlIFdvcmtlcjogRXJyb3I6ICR7ZXJyfWApKTtcclxuICAgIH0pO1xyXG4gIH0iLCJjb25zb2xlLmxvZyhcIkluaXRpYXRpbmcgYW5pbWF0aW9uXCIpO1xyXG5cclxuLy8gISBTYWZhcmkgZG9lcyBub3Qgc3VwcG9ydCAnSW50ZXJzZWN0aW9uIE9ic2VydmVyJywgdXNlIHBvbHlmaWxsXHJcblxyXG5jb25zdCBtcTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xyXG5jb25zdCBtcTEwMjQgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEwMjRweClcIik7XHJcblxyXG4vLyBBZGQtb24gY2xhc3MgYXBwZWFyXHJcbmNvbnN0IGZhZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYWRlcicpO1xyXG4vLyBBZGQtb24gY2xhc3Mgc2xpZGVcclxuY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXInKTtcclxuLy8gQWRkLW9uIGNsYXNzIHJldmVhbFxyXG5jb25zdCByZXZlYWxlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2ZWFsZXInKTtcclxuXHJcbi8vICogQ29uZmlndXJhdGlvbnM6IFwiZmFkZS1pblwiXHJcbi8vIGFwcGVhciB3aGVuIHRoZSBlbnRpcmUgY29udGVudCBpcyBpbiB2aWV3XHJcblxyXG4vLyBERUZBVUxUIHx8IEZPUiBERVNLVE9QLVRBQkxFVFxyXG5jb25zdCBhcHBlYXJPcHRpb25zID0ge1xyXG4gICAgdGhyZXNob2xkOiAxLCAvLyBmaXJlcyBieSBob3cgbXVjaCB0aGUgZWxlbWVudCBpcyBvbiBkaXNwbGF5XHJcbiAgICByb290TWFyZ2luOiBcIjBweCAwcHggLTEwMHB4IDBweFwiIC8vIHRvcCByaWdodCBib3R0b20gbGVmdFxyXG59O1xyXG5cclxuLy8gRk9SIE1PQklMRVxyXG5jb25zdCBhcHBlYXJPcHRpb25zTW9iaWxlVmlldyA9IHtcclxuICAgIHRocmVzaG9sZDogMC41LFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIlxyXG59O1xyXG5cclxuLy8gKiBDb25maWd1cmF0aW9uczogXCJzbGlkZS1pblwiXHJcbi8vIERFRkFVTFRcclxuY29uc3QgcmV2ZWFsT3B0aW9ucyA9IHtcclxuICAgIHRocmVzaG9sZDogMC44LFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDBweCAwcHhcIlxyXG59O1xyXG5cclxuLy8gKiBDb25maWd1cmF0aW9uczogXCJzbGlkZS1pblwiXHJcbi8vIERFRkFVTFRcclxuY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcclxuICAgIHRocmVzaG9sZDogMC44LFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHggMHB4IDQ1cHggMHB4XCJcclxuICAgIC8vIHJvb3RNYXJnaW46IFwiMHB4IDBweCAtMjUwcHggMHB4XCJcclxufTtcclxuXHJcbi8vICMgUkVWRUFMRVJTXHJcbmNvbnN0IHJldmVhbE9uU2Nyb2xsTW9iaWxlVmlldyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcywgcmV2ZWFsT25TY3JvbGxNb2JpbGVWaWV3KSB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdyZXZlYWwnKTtcclxuICAgICAgICAgICAgcmV2ZWFsT25TY3JvbGxNb2JpbGVWaWV3LnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59LCByZXZlYWxPcHRpb25zKTtcclxuXHJcbi8vICMgU0xJREVSU1xyXG5jb25zdCBzbGlkZU9uU2Nyb2xsTW9iaWxlVmlldyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcywgc2xpZGVPblNjcm9sbE1vYmlsZVZpZXcpIHtcclxuICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgaWYgKCFlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NsaWRlJyk7XHJcbiAgICAgICAgICAgIHNsaWRlT25TY3JvbGxNb2JpbGVWaWV3LnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59LCBzbGlkZXJPcHRpb25zKTtcclxuXHJcbnJldmVhbGVycy5mb3JFYWNoKHJldmVhbGVyID0+IHtcclxuICAgIHJldmVhbE9uU2Nyb2xsTW9iaWxlVmlldy5vYnNlcnZlKHJldmVhbGVyKTtcclxufSlcclxuXHJcbnNsaWRlcnMuZm9yRWFjaChzbGlkZXIgPT4ge1xyXG4gICAgc2xpZGVPblNjcm9sbE1vYmlsZVZpZXcub2JzZXJ2ZShzbGlkZXIpO1xyXG59KVxyXG5cclxuXHJcbmlmIChtcTYwMC5tYXRjaGVzKSB7XHJcbiAgICAvLyAjIEZBREVSU1xyXG4gICAgY29uc3QgYXBwZWFyT25TY3JvbGxNb2JpbGVWaWV3ID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChlbnRyaWVzLCBhcHBlYXJPblNjcm9sbCkge1xyXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhcHBlYXInKTtcclxuICAgICAgICAgICAgICAgIGFwcGVhck9uU2Nyb2xsLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCBhcHBlYXJPcHRpb25zTW9iaWxlVmlldyk7XHJcblxyXG5cclxuXHJcbiAgICBmYWRlcnMuZm9yRWFjaChmYWRlciA9PiB7XHJcbiAgICAgICAgYXBwZWFyT25TY3JvbGxNb2JpbGVWaWV3Lm9ic2VydmUoZmFkZXIpO1xyXG4gICAgfSlcclxuXHJcbn0gZWxzZSB7XHJcbiAgICBjb25zdCBhcHBlYXJPblNjcm9sbCA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbiAoZW50cmllcywgYXBwZWFyT25TY3JvbGwpIHtcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYXBwZWFyJyk7XHJcbiAgICAgICAgICAgICAgICBhcHBlYXJPblNjcm9sbC51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgYXBwZWFyT3B0aW9ucyk7XHJcblxyXG4gICAgZmFkZXJzLmZvckVhY2goZmFkZXIgPT4ge1xyXG4gICAgICAgIGFwcGVhck9uU2Nyb2xsLm9ic2VydmUoZmFkZXIpO1xyXG4gICAgfSlcclxufVxyXG4iLCIvLyBoZWFkZXIgbW9kdWxlIiwiLy8gIyBNQUlOXHJcblxyXG4vLyBDVEEgXCJSRUFEIE1PUkVcIiBCdXR0b25cclxuLy8gVGFyZ2V0czpcclxuY29uc3QgcmVhZE1vcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVhZC1tb3JlLWJ0bicpO1xyXG5jb25zdCBtb3JlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb3JlJyk7XHJcbmNvbnN0IGRvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZG90cycpO1xyXG5jb25zdCBkb3VibGVBcnJvd1N5bWJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb3VibGUtYXJyb3ctc3ltYm9sJyk7XHJcbmNvbnN0IENvbnRhaW5lclJlYWRNb3JlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lci1yZWFkLW1vcmUtYnRuJyk7XHJcblxyXG5jb25zdCB0aW1lbGluZVdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRpbWVsaW5lLXdyYXAnKTtcclxuXHJcbmNvbnN0IHRpbWVsaW5lQmdFbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUtYmctZG90LmVuZCcpO1xyXG5cclxuY29uc3QgdGltZWxpbmVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW1lbGluZS1pdGVtJyk7XHJcblxyXG5jb25zdCB0aW1lbGluZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZWxpbmUtaXRlbScpO1xyXG5jb25zdCBnYWxsZXJ5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnknKTtcclxuXHJcbi8vICMgXCJSRUFEIE1PUkVcIiBCdXR0b24gLSB0b2dnbGUgZnVuY3Rpb25cclxuLy8gY2hhbmdlIGJ1dHRvbiB0ZXh0XHJcbi8vIGNoYW5nZSBidXR0b24gcG9zaXRpb25cclxuZm9yIChsZXQgaSA9IDA7IGkgPCByZWFkTW9yZUJ0bi5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgbGV0IGlzT3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgcmVhZE1vcmVCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiBtb3JlQ29udGVudCgpIHtcclxuXHJcbiAgICAgICAgaWYgKCFpc09wZW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW5cIiArIGkpO1xyXG4gICAgICAgICAgICBkb3RzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIG1vcmVUZXh0W2ldLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgcmVhZE1vcmVCdG5baV0uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZG91YmxlLWFycm93LXN5bWJvbFwiPiZsYXF1bzs8L3NwYW4+IFJFQUQgTEVTUyAnO1xyXG4gICAgICAgICAgICBDb250YWluZXJSZWFkTW9yZUJ0bltpXS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdmbGV4LWVuZCc7XHJcbiAgICAgICAgICAgIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICAgICAgZ2FsbGVyeUNvbnRhaW5lcltpXS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcblxyXG4gICAgICAgICAgICBpc09wZW5lZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyAqIE5PVEU6IHRpbWVsaW5lV3JhcHBlcnMgbGVuZ3RoIGFuZCByZWFkTW9yZUJ0biBsZW5ndGggYXJlIGRpZmZlcmVudCFcclxuICAgICAgICAgICAgaWYgKGkgPj0gNikge1xyXG4gICAgICAgICAgICAgICAgLy8gKiBIb3RmaXg6IHVucmVzcG9uc2l2ZSBjbGljayBldmVudCBsaXN0ZW5lciBmb3IgbGFzdCB0aW1lbGluZS1pdGVtXHJcbiAgICAgICAgICAgICAgICAvLyAqIFNpdHVhdGlvbjogVW5hYmxlIHRvIGNsb3NlXHJcbiAgICAgICAgICAgICAgICAvLyBDb25kdGlvbjogVGFyZ2V0IGxhc3QgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gcmVhZE1vcmVCdG4ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVXcmFwcGVyc1tpICsgMV0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2kgKyAxXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgZ2FsbGVyeUNvbnRhaW5lcltpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICogU3R5bGVzOiBHaXZlIHBhZGRpbmcgdG8gTkVYVCB0aW1lbGluZS13cmFwXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVXcmFwcGVyc1tpICsgMl0uY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2kgKyAxXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgQ29udGFpbmVyUmVhZE1vcmVCdG5baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBnYWxsZXJ5Q29udGFpbmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2ldLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBDb250YWluZXJSZWFkTW9yZUJ0bltpXSk7XHJcbiAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2ldLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBnYWxsZXJ5Q29udGFpbmVyW2ldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gKiBTaXR1YXRpb246IFtTdHlsZXMgYWRkaXRpb24gLyBob3RmaXhdXHJcbiAgICAgICAgICAgIC8vIGFkZCBhZXN0aGV0aWMgZm9yIGxhc3QgdHdvIGdhbGxlcnkgaW50ZXJhY3Rpb25cclxuICAgICAgICAgICAgaWYgKGkgPT0gcmVhZE1vcmVCdG4ubGVuZ3RoIC0gMikge1xyXG4gICAgICAgICAgICAgICAgdGltZWxpbmVCZ0VuZC5jbGFzc0xpc3QuYWRkKCdzcGVjaWFsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xvc2UnKTtcclxuICAgICAgICAgICAgZG90c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XHJcbiAgICAgICAgICAgIG1vcmVUZXh0W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHJlYWRNb3JlQnRuW2ldLmlubmVySFRNTCA9ICdSRUFEIE1PUkUgPHNwYW4gY2xhc3M9XCJkb3VibGUtYXJyb3ctc3ltYm9sXCI+JnJhcXVvOzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBDb250YWluZXJSZWFkTW9yZUJ0bltpXS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdmbGV4LXN0YXJ0JztcclxuICAgICAgICAgICAgQ29udGFpbmVyUmVhZE1vcmVCdG5baV0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBnYWxsZXJ5Q29udGFpbmVyW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgIGlzT3BlbmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA+PSA2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSByZWFkTW9yZUJ0bi5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKiBVTkxFU1MuLi4gaWYgdGhlIHByZXZpb3VzIGVsZW1lbnQgZm9yIHRoZSBsYXN0IHRpbWVsaW5lIHdyYXBwZXIgaXMgb3Blbiwga2VlcCBjbGFzcyBvcGVuICh0aGUgcGFkZGluZylcclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2kgKyAxXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lSXRlbXNbaSArIDFdLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZ2FsbGVyeUNvbnRhaW5lcltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVJdGVtc1tpICsgMV0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBDb250YWluZXJSZWFkTW9yZUJ0bltpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDJdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVJdGVtc1tpICsgMV0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBnYWxsZXJ5Q29udGFpbmVyW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lbGluZUl0ZW1zW2kgKyAxXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lbGluZVdyYXBwZXJzW2kgKyAxXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGltZWxpbmVJdGVtc1tpXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGdhbGxlcnlDb250YWluZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGltZWxpbmVJdGVtc1tpXS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIENvbnRhaW5lclJlYWRNb3JlQnRuW2ldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gKiBTaXR1YXRpb246IFtTdHlsZXMgYWRkaXRpb24gLyBob3RmaXhdXHJcbiAgICAgICAgICAgIC8vIGFkZCBhZXN0aGV0aWMgZm9yIGxhc3QgdHdvIGdhbGxlcnkgaW50ZXJhY3Rpb25cclxuICAgICAgICAgICAgaWYgKGdhbGxlcnlDb250YWluZXJbcmVhZE1vcmVCdG4ubGVuZ3RoIC0gMl0uY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nIC8vIHJldHVybiB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIHRpbWVsaW5lV3JhcHBlcnNbaSArIDFdLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IHJlYWRNb3JlQnRuLmxlbmd0aCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVsaW5lQmdFbmQuY2xhc3NMaXN0LnJlbW92ZSgnc3BlY2lhbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8gIyBHQUxMRVJZIFNFVFVQXHJcblxyXG5jb25zdCBtcTYwMCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNjAwcHgpXCIpO1xyXG5jb25zdCBtcTEwMjQgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEwMjRweClcIik7XHJcblxyXG5pZiAobXE2MDAubWF0Y2hlcykge1xyXG4gICAgLy8gIyBNT0JJTEUgaW1hZ2Ugc2l6ZVxyXG4gICAgY29uc3QgZ2FsbGVyeVByb3BlcnR5ID0ge1xyXG4gICAgICAgICcxODU4Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAwLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItYWdlMTEtcGFyaXMtMjA5dy5qcGcnLCAnaW1hZ2VzL0JpcnRocGxhY2UtZnJvbS13ZXN0LXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgMTEgeWVhcnMgb2xkIGF0IFBhcmlzLicsICdNYW5oYXR0YW4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gMTEgeWVhcnMgb2xkLiAoUGFyaXMpJywgJ01hbmhhdHRhbi4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4NzknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hdmlkLWJveGVyLWF0LWhhcnZhcmQtc21sLTYwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBzaXR0aW5nIGRvd24gd2l0aCBoaXMgYXJtcyBjcm9zc2VkLiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiBhbiBhdmlkIGJveGVyYW5kIHdyZXN0bGVyLiAoSGFydmFyZCknXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODAnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDIsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy93aGl0ZS1ob3VzZS1wb3J0cmFpdC1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnUG9ydHJhaXQgb2YgVGhlb2RvcmUgUm9vc2V2ZWx0IHBhaW50ZWQgYnkgSm9obiBTaW5nZXIgU2FyZ2VudC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1RoaXMgb2ZmaWNpYWwgcG9ydHJhaXQgb2YgVGhlb2RvcmUgUm9vc2V2ZWx0IHdhcyBwYWludGVkIGJ5IEpvaG4gU2luZ2VyIFNhcmdlbnQuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODgxJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAzLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvcm9vc2V2ZWx0LXJlYWRpbmctc21sLTYwMHcuanBnJywgJ2ltYWdlcy90ci13cml0aW5ncy1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IHNpdHRpbmcgd2l0aCBhIGJvb2sgb24gaGlzIGhhbmQuJywgJ0EgY29sbGVjdGlvbiBvZiBUaGVvZG9yZVxcJ3MgYm9va3Mgb24gdGhlIHNoZWxmJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIHNpdHRpbmcgd2l0aCBhIGJvb2sgb24gaGlzIGhhbmQuJywgJ1QuUi4gYm9va3MgaGUgaGFzIHdyaXR0ZW4uJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODg0Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA0LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItbW90aGVyLWFuZC1maXJzdC13aWZlLXNtbC02MDB3LmpwZycsICdpbWFnZXMvdHItc2hlcmlmLXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHRcXCdzIG1vdGhlciBhbmQgd2lmZS4nLCAnVGhlb2RvcmUgUm9vc2V2ZWx0IGluIHNoZXJpZlxcJ3MgdW5pZm9ybSddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLlxcJ3MgbW90aGVyIChsZWZ0KSBhbmQgaGlzIGZpcnN0IHdpZmUgKHJpZ2h0KS4nLCAnVC5SLiBhcyBhIHNoZXJpZi4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODYnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDUsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1ob3JzZS1zbWwtNjAwdy5qcGcnLCAnaW1hZ2VzL3RyLW5ldy1mYW1pbHktc21sLTYwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBvbiBhIGhvcnNlLicsICdUaGVvZG9yZSBSb29zZXZlbHQgYW5kIGhpcyBuZXcgZmFtaWx5LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiB3cml0aW5nIGF0IGEgZGVzay4nLCAnVC5SLiBmYW1pbHkuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODk1Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA2LFxyXG4gICAgICAgICAgICAndXJsJzogbnVsbCxcclxuICAgICAgICAgICAgJ2FsdCc6IG51bGwsXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4OTcnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDcsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy9zcGFuaXNoLXZzLWFtZXJpY2Fucy1zbWwtNjAwdy5qcGcnLCAnaW1hZ2VzL3JvdWdoLXJpZGVycy1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnQSBwYWludGluZyBvZiB0aGUgQXNpYXRpYyBTcXVhZHJvbiBkZXN0cm95aW5nIFNwYW5pc2ggZmxlZXQgaW4gQmF0dGxlIG9mIE1hbmlsYSBCYXkuJywgJ0EgZ3JvdXAgb2YgcGVvcGxlIGtub3duIGFzIHRoZSBSb3VnaCBSaWRlcnMnXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ0FzaWF0aWMgU3F1YWRyb24gZGVzdHJveWluZyBTcGFuaXNoIGZsZWV0IGluIEJhdHRsZSBvZiBNYW5pbGEgQmF5IG9uIE1heSAxIDE4OTgnLCAnUm91Z2ggUmlkZXJzJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTAxJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA4LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItYXQtY2hpY2Fnby1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IGF0IENoaWNhZ28uJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIGF0IENoaWNhZ28uJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTA5Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA5LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItc2FmYXJpLXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgc3RhbmRpbmcgbmV4dCB0byB0aGUgZWxlcGhhbnQgaGUgc2hvdCBvbiBzYWZhcmkuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIgc3RhbmRpbmcgbmV4dCB0byB0aGUgZWxlcGhhbnQgaGUgc2hvdCBvbiBzYWZhcmkuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTEwJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxMCxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWFuZC10YWZ0LXNtbC02MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgYW5kIFRhZnQuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIgKGxlZnQpIGFuZCBUYWZ0IChyaWdodCkuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTEyJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxMSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLW1lZGljYWwteHJheS1zbWwtNjAwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IG1lZGljYWwgeC1yYXkgb24gT2N0b2JlciAxNCBhZnRlciB0aGUgYXNzYXNzaW5hdGlvbiBhdHRlbXB0LCBzaG93aW5nIHRoZSBidWxsZXQuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIG1lZGljYWwgeC1yYXkgb24gT2N0b2JlciAxNCBhZnRlciB0aGUgYXNzYXNzaW5hdGlvbiBhdHRlbXB0LCBzaG93aW5nIHRoZSBidWxsZXQuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTE5Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxMixcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLXRvbWItc21sLTYwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdFxcJ3MgZ3JhdmUuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuXFwncyBncmF2ZSwgT3lzdGVyIEJheSwgTmV3IFlvcmsuJ11cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNyZWF0ZUdhbGxlcnkoZ2FsbGVyeVByb3BlcnR5KTtcclxufSBlbHNlIGlmIChtcTEwMjQubWF0Y2hlcykge1xyXG4gICAgLy8gIyBUQUJMRVQgaW1hZ2Ugc2l6ZVxyXG4gICAgY29uc3QgZ2FsbGVyeVByb3BlcnR5ID0ge1xyXG4gICAgICAgICcxODU4Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAwLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItYWdlMTEtcGFyaXMtMjA5dy5qcGcnLCAnaW1hZ2VzL0JpcnRocGxhY2UtZnJvbS13ZXN0LW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IDExIHllYXJzIG9sZCBhdCBQYXJpcy4nLCAnTWFuaGF0dGFuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIDExIHllYXJzIG9sZC4gKFBhcmlzKScsICdNYW5oYXR0YW4uJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODc5Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItYXZpZC1ib3hlci1hdC1oYXJ2YXJkLW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IHNpdHRpbmcgZG93biB3aXRoIGhpcyBhcm1zIGNyb3NzZWQuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIGFuIGF2aWQgYm94ZXJhbmQgd3Jlc3RsZXIuIChIYXJ2YXJkKSddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg4MCc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMixcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3doaXRlLWhvdXNlLXBvcnRyYWl0LW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnUG9ydHJhaXQgb2YgVGhlb2RvcmUgUm9vc2V2ZWx0IHBhaW50ZWQgYnkgSm9obiBTaW5nZXIgU2FyZ2VudC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1RoaXMgb2ZmaWNpYWwgcG9ydHJhaXQgb2YgVGhlb2RvcmUgUm9vc2V2ZWx0IHdhcyBwYWludGVkIGJ5IEpvaG4gU2luZ2VyIFNhcmdlbnQuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODgxJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAzLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvcm9vc2V2ZWx0LXJlYWRpbmctMTAwMHcuanBnJywgJ2ltYWdlcy90ci13cml0aW5ncy1tZWQtMTAyNHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBzaXR0aW5nIHdpdGggYSBib29rIG9uIGhpcyBoYW5kLicsICdBIGNvbGxlY3Rpb24gb2YgVGhlb2RvcmVcXCdzIGJvb2tzIG9uIHRoZSBzaGVsZiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLiBzaXR0aW5nIHdpdGggYSBib29rIG9uIGhpcyBoYW5kLicsICdULlIuIGJvb2tzIGhlIGhhcyB3cml0dGVuLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg4NCc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNCxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLW1vdGhlci1hbmQtZmlyc3Qtd2lmZS0xMDY1dy5qcGcnLCAnaW1hZ2VzL3RyLXNoZXJpZi04MDB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHRcXCdzIG1vdGhlciBhbmQgd2lmZS4nLCAnVGhlb2RvcmUgUm9vc2V2ZWx0IGluIHNoZXJpZlxcJ3MgdW5pZm9ybSddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLlxcJ3MgbW90aGVyIChsZWZ0KSBhbmQgaGlzIGZpcnN0IHdpZmUgKHJpZ2h0KS4nLCAnVC5SLiBhcyBhIHNoZXJpZi4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODYnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDUsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1ob3JzZS1tZWQtMTAyNHcuanBnJywgJ2ltYWdlcy90ci1uZXctZmFtaWx5LW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IG9uIGEgaG9yc2UuJywgJ1RoZW9kb3JlIFJvb3NldmVsdCBhbmQgaGlzIG5ldyBmYW1pbHkuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIHdyaXRpbmcgYXQgYSBkZXNrLicsICdULlIuIGZhbWlseS4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4OTUnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDYsXHJcbiAgICAgICAgICAgICd1cmwnOiBudWxsLFxyXG4gICAgICAgICAgICAnYWx0JzogbnVsbCxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg5Nyc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNyxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3NwYW5pc2gtdnMtYW1lcmljYW5zLW1lZC0xMDI0dy5qcGcnLCAnaW1hZ2VzL3JvdWdoLXJpZGVycy1tZWQtMTAyNHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ0EgcGFpbnRpbmcgb2YgdGhlIEFzaWF0aWMgU3F1YWRyb24gZGVzdHJveWluZyBTcGFuaXNoIGZsZWV0IGluIEJhdHRsZSBvZiBNYW5pbGEgQmF5LicsICdBIGdyb3VwIG9mIHBlb3BsZSBrbm93biBhcyB0aGUgUm91Z2ggUmlkZXJzJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydBc2lhdGljIFNxdWFkcm9uIGRlc3Ryb3lpbmcgU3BhbmlzaCBmbGVldCBpbiBCYXR0bGUgb2YgTWFuaWxhIEJheSBvbiBNYXkgMSAxODk4JywgJ1JvdWdoIFJpZGVycyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTkwMSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogOCxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWF0LWNoaWNhZ28tbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgYXQgQ2hpY2Fnby4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gYXQgQ2hpY2Fnby4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MDknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDksXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1zYWZhcmktbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgc3RhbmRpbmcgbmV4dCB0byB0aGUgZWxlcGhhbnQgaGUgc2hvdCBvbiBzYWZhcmkuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIgc3RhbmRpbmcgbmV4dCB0byB0aGUgZWxlcGhhbnQgaGUgc2hvdCBvbiBzYWZhcmkuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTEwJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxMCxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWFuZC10YWZ0LW1lZC0xMDI0dy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IGFuZCBUYWZ0LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SIChsZWZ0KSBhbmQgVGFmdCAocmlnaHQpLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTkxMic6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMTEsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1tZWRpY2FsLXhyYXktbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgbWVkaWNhbCB4LXJheSBvbiBPY3RvYmVyIDE0IGFmdGVyIHRoZSBhc3Nhc3NpbmF0aW9uIGF0dGVtcHQsIHNob3dpbmcgdGhlIGJ1bGxldC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gbWVkaWNhbCB4LXJheSBvbiBPY3RvYmVyIDE0IGFmdGVyIHRoZSBhc3Nhc3NpbmF0aW9uIGF0dGVtcHQsIHNob3dpbmcgdGhlIGJ1bGxldC4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MTknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEyLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItdG9tYi1tZWQtMTAyNHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdFxcJ3MgZ3JhdmUuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuXFwncyBncmF2ZSwgT3lzdGVyIEJheSwgTmV3IFlvcmsuJ11cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNyZWF0ZUdhbGxlcnkoZ2FsbGVyeVByb3BlcnR5KTtcclxufSBlbHNlIHtcclxuICAgIC8vICMgREVTS1RPUCAob3IgaGlnaGVyKSBpbWFnZSBzaXplXHJcbiAgICBjb25zdCBnYWxsZXJ5UHJvcGVydHkgPSB7XHJcbiAgICAgICAgJzE4NTgnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDAsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hZ2UxMS1wYXJpcy0yMDl3LmpwZycsICdpbWFnZXMvQmlydGhwbGFjZS1mcm9tLXdlc3QtbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgMTEgeWVhcnMgb2xkIGF0IFBhcmlzLicsICdNYW5oYXR0YW4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gMTEgeWVhcnMgb2xkLiAoUGFyaXMpJywgJ01hbmhhdHRhbi4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4NzknOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDEsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hdmlkLWJveGVyLWF0LWhhcnZhcmQtbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgc2l0dGluZyBkb3duIHdpdGggaGlzIGFybXMgY3Jvc3NlZC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gYW4gYXZpZCBib3hlcmFuZCB3cmVzdGxlci4gKEhhcnZhcmQpJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODgwJzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAyLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvd2hpdGUtaG91c2UtcG9ydHJhaXQtbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydQb3J0cmFpdCBvZiBUaGVvZG9yZSBSb29zZXZlbHQgcGFpbnRlZCBieSBKb2huIFNpbmdlciBTYXJnZW50LiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVGhpcyBvZmZpY2lhbCBwb3J0cmFpdCBvZiBUaGVvZG9yZSBSb29zZXZlbHQgd2FzIHBhaW50ZWQgYnkgSm9obiBTaW5nZXIgU2FyZ2VudC4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE4ODEnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDMsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy9yb29zZXZlbHQtcmVhZGluZy0xMDAwdy5qcGcnLCAnaW1hZ2VzL3RyLXdyaXRpbmdzLWxnZS0xMjgwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IHNpdHRpbmcgd2l0aCBhIGJvb2sgb24gaGlzIGhhbmQuJywgJ0EgY29sbGVjdGlvbiBvZiBUaGVvZG9yZVxcJ3MgYm9va3Mgb24gdGhlIHNoZWxmJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIHNpdHRpbmcgd2l0aCBhIGJvb2sgb24gaGlzIGhhbmQuJywgJ1QuUi4gYm9va3MgaGUgaGFzIHdyaXR0ZW4uJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODg0Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA0LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItbW90aGVyLWFuZC1maXJzdC13aWZlLTEwNjV3LmpwZycsICdpbWFnZXMvdHItc2hlcmlmLTgwMHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdFxcJ3MgbW90aGVyIGFuZCB3aWZlLicsICdUaGVvZG9yZSBSb29zZXZlbHQgaW4gc2hlcmlmXFwncyB1bmlmb3JtJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuXFwncyBtb3RoZXIgKGxlZnQpIGFuZCBoaXMgZmlyc3Qgd2lmZSAocmlnaHQpLicsICdULlIuIGFzIGEgc2hlcmlmLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg4Nic6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNSxcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLWhvcnNlLWxnZS0xMjgwdy5qcGcnLCAnaW1hZ2VzL3RyLW5ldy1mYW1pbHktbGdlLTEyODB3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHQgb24gYSBob3JzZS4nLCAnVGhlb2RvcmUgUm9vc2V2ZWx0IGFuZCBoaXMgbmV3IGZhbWlseS4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUi4gd3JpdGluZyBhdCBhIGRlc2suJywgJ1QuUi4gZmFtaWx5LiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTg5NSc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogNixcclxuICAgICAgICAgICAgJ3VybCc6IG51bGwsXHJcbiAgICAgICAgICAgICdhbHQnOiBudWxsLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgICcxODk3Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA3LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvc3BhbmlzaC12cy1hbWVyaWNhbnMtbGdlLTEyODB3LmpwZycsICdpbWFnZXMvcm91Z2gtcmlkZXJzLTExNDR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydBIHBhaW50aW5nIG9mIHRoZSBBc2lhdGljIFNxdWFkcm9uIGRlc3Ryb3lpbmcgU3BhbmlzaCBmbGVldCBpbiBCYXR0bGUgb2YgTWFuaWxhIEJheS4nLCAnQSBncm91cCBvZiBwZW9wbGUga25vd24gYXMgdGhlIFJvdWdoIFJpZGVycyddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnQXNpYXRpYyBTcXVhZHJvbiBkZXN0cm95aW5nIFNwYW5pc2ggZmxlZXQgaW4gQmF0dGxlIG9mIE1hbmlsYSBCYXkgb24gTWF5IDEgMTg5OCcsICdSb3VnaCBSaWRlcnMnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MDEnOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDgsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hdC1jaGljYWdvLWxnZS0xMjgwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IGF0IENoaWNhZ28uJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIGF0IENoaWNhZ28uJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTA5Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiA5LFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItc2FmYXJpLWxnZS0xMjgwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IHN0YW5kaW5nIG5leHQgdG8gdGhlIGVsZXBoYW50IGhlIHNob3Qgb24gc2FmYXJpLiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SIHN0YW5kaW5nIG5leHQgdG8gdGhlIGVsZXBoYW50IGhlIHNob3Qgb24gc2FmYXJpLiddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnMTkxMCc6IHtcclxuICAgICAgICAgICAgJ2luZGV4JzogMTAsXHJcbiAgICAgICAgICAgICd1cmwnOiBbJ2ltYWdlcy90ci1hbmQtdGFmdC1sZ2UtMTI4MHcuanBnJ10sXHJcbiAgICAgICAgICAgICdhbHQnOiBbJ1RoZW9kb3JlIFJvb3NldmVsdCBhbmQgVGFmdC4nXSxcclxuICAgICAgICAgICAgJ2ZpZ2NhcHRpb24nOiBbJ1QuUiAobGVmdCkgYW5kIFRhZnQgKHJpZ2h0KS4nXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJzE5MTInOiB7XHJcbiAgICAgICAgICAgICdpbmRleCc6IDExLFxyXG4gICAgICAgICAgICAndXJsJzogWydpbWFnZXMvdHItbWVkaWNhbC14cmF5LWxnZS0xMjgwdy5qcGcnXSxcclxuICAgICAgICAgICAgJ2FsdCc6IFsnVGhlb2RvcmUgUm9vc2V2ZWx0IG1lZGljYWwgeC1yYXkgb24gT2N0b2JlciAxNCBhZnRlciB0aGUgYXNzYXNzaW5hdGlvbiBhdHRlbXB0LCBzaG93aW5nIHRoZSBidWxsZXQuJ10sXHJcbiAgICAgICAgICAgICdmaWdjYXB0aW9uJzogWydULlIuIG1lZGljYWwgeC1yYXkgb24gT2N0b2JlciAxNCBhZnRlciB0aGUgYXNzYXNzaW5hdGlvbiBhdHRlbXB0LCBzaG93aW5nIHRoZSBidWxsZXQuJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICcxOTE5Jzoge1xyXG4gICAgICAgICAgICAnaW5kZXgnOiAxMixcclxuICAgICAgICAgICAgJ3VybCc6IFsnaW1hZ2VzL3RyLXRvbWItbWVkLTEwMjR3LmpwZyddLFxyXG4gICAgICAgICAgICAnYWx0JzogWydUaGVvZG9yZSBSb29zZXZlbHRcXCdzIGdyYXZlLiddLFxyXG4gICAgICAgICAgICAnZmlnY2FwdGlvbic6IFsnVC5SLlxcJ3MgZ3JhdmUsIE95c3RlciBCYXksIE5ldyBZb3JrLiddXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjcmVhdGVHYWxsZXJ5KGdhbGxlcnlQcm9wZXJ0eSk7XHJcbn1cclxuLy8gdG90YWwgeDEzIHRpbWVsaW5lIGl0ZW1zXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR2FsbGVyeShnYWxsZXJ5UHJvcGVydHkpIHtcclxuICAgIGZvciAobGV0IGtleSBpbiBnYWxsZXJ5UHJvcGVydHkpIHtcclxuICAgICAgICAvLyAjIENyZWF0ZSAnLmdhbGxlcnlfX2NvbnRlbnQnLFxyXG4gICAgICAgIC8vICcuZ2FsbGVyeV9faW1hZ2UnLFxyXG4gICAgICAgIC8vICdnYWxsZXJ5X190ZXh0JyxcclxuICAgICAgICAvLyAncCcgZWxlbWVudCxcclxuICAgICAgICAvLyAjIENyZWF0ZSBhbiBFdmVudCBMaXN0ZW5lclxyXG4gICAgICAgIC8vIHRleHROb2RlIGFsdCB0ZXh0IGZvciBlYWNoIGltYWdlIFtTdG9yYWdlXSA+PiBBZGQgRXZlbnQgTGlzdGVuZXJcclxuICAgICAgICAvLyB0ZXh0Tm9kZSBmaWdjYXB0aW9uIGZvciBlYWNoIGltYWdlIFtTdG9yYWdlXSA+PiBBZGQgRXZlbnQgTGlzdGVuZXJcclxuICAgICAgICAvLyBpbWFnZXMgZm9yIGVhY2ggaW1hZ2UgW1N0b3JhZ2VdID4+IEFkZCBFdmVudCBMaXN0ZW5lclxyXG4gICAgICAgIC8vICMgQ3JlYXQgSUYgY29uZGl0aW9uIGlzIG1ldFxyXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgaW1hZ2UgdXJsIHN0b3JlZFxyXG4gICAgICAgIC8vIENyZWF0ZSBzcGFuIFRhZ3MgZm9yIGRvdCBpbmRpY2F0b3JzXHJcbiAgICAgICAgLy8gQWRkIEV2ZW50IExpc3RlbmVyXHJcbiAgICAgICAgLy8gV2hlbiAnY2xpY2snIHNob3cgY3VycmVudCBzbGlkZVxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIGN1cnJlbnRTbGlkZSgpXHJcbiAgICAgICAgLy8gQ3JlYXRlIHByZXYgLyBuZXh0IGJ1dHRvbiB0byBsb29rIHRocm91Z2ggaW1hZ2VzXHJcbiAgICAgICAgLy8gQWRkIEV2ZW50IExpc3RlbmVyXHJcbiAgICAgICAgLy8gV2hlbiAnY2xpY2snIG1vdmUgcHJldmlvdXMgb3IgbmV4dFxyXG4gICAgICAgIC8vIERpc2FibGUgIHByZXYgLyBuZXh0IHdoZW4gYXQgdGhlIGVuZCBvciBiZWdpbm5pbmcgb2YgbGVuZ3RoLlxyXG5cclxuICAgICAgICAvLyAhIFdJUCAtIE5lZWQgdG8gc2tpcCB0aGlzIHRleHQgc2VjdGlvbiB0byBkaXNwbGF5IGltYWdlcyA+PlxyXG4gICAgICAgIGlmIChrZXkgPT0gJzE4OTUnKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdhbGxlcnlQcm9wZXJ0eVtrZXldWydpbmRleCddID09PSA2KSB7XHJcbiAgICAgICAgICAgIC8vICogTE9HR0lOR1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUGFzcyBjb25kaXRpb246IFNraXAgMicsICdDcmVhdGluZyBnYWxsZXJ5JywgZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2luZGV4J10sIGtleSk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAhIDw8XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSAnLmdhbGxlcnlfX2NvbnRlbnQnXHJcbiAgICAgICAgbGV0IGdhbGxlcnlDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZ2FsbGVyeUNvbnRlbnQuY2xhc3NOYW1lID0gJ2dhbGxlcnlfX2NvbnRlbnQnO1xyXG4gICAgICAgIC8vIENyZWF0ZSAnLmdhbGxlcnlfX2ltYWdlJ1xyXG4gICAgICAgIGxldCBnYWxsZXJ5SW1hZ2VTbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBnYWxsZXJ5SW1hZ2VTbGlkZXIuY2xhc3NOYW1lID0gJ2dhbGxlcnlfX2ltYWdlJztcclxuICAgICAgICAvLyBDcmVhdGUgJy5nYWxsZXJ5X190ZXh0J1xyXG4gICAgICAgIGxldCBnYWxsZXJ5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGdhbGxlcnlUZXh0LmNsYXNzTmFtZSA9ICdnYWxsZXJ5X190ZXh0JztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZ2FsbGVyeVByb3BlcnR5W2tleV1bJ3VybCddWzBdKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlICdwJyBlbGVtZW50XHJcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgLy8gQ3JlYXRlICdpbWFnZScgZWxlbWVudFxyXG4gICAgICAgIGxldCBpbWFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAvLyBDcmVhdGUgdGV4dE5vZGUgZm9yIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBhcnJheVxyXG4gICAgICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGdhbGxlcnlQcm9wZXJ0eVtrZXldWydmaWdjYXB0aW9uJ11bMF0pO1xyXG5cclxuICAgICAgICAvLyBTZXQgdXAgZmlyc3QgaW1hZ2UgdG8gZGlzcGxheSBhcyBkZWZhdWx0XHJcbiAgICAgICAgLy8gQXBwZW5kIGltYWdlc1xyXG4gICAgICAgIGltYWdlcy5zcmMgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ11bMF07XHJcbiAgICAgICAgaW1hZ2VzLmFsdCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydhbHQnXVswXTtcclxuXHJcbiAgICAgICAgLy8gIyBBcHBlbmQgdGhlIHdob2xlIGdhbGxlcnkgY29udGVudCB0b2dldGhlclxyXG4gICAgICAgIGxldCBpbmRleCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydpbmRleCddO1xyXG5cclxuICAgICAgICAvLyAqIENvbmRpdGlvbiBmb3IgdGhlIDZ0aCBvbmx5IHRleHQgbWFpbnRlbmFuY2VcclxuICAgICAgICBpZiAoaW5kZXggPj0gNikge1xyXG4gICAgICAgICAgICBnYWxsZXJ5Q29udGFpbmVyW2luZGV4IC0gMV0uYXBwZW5kQ2hpbGQoZ2FsbGVyeUNvbnRlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdhbGxlcnlDb250YWluZXJbaW5kZXhdLmFwcGVuZENoaWxkKGdhbGxlcnlDb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdhbGxlcnlDb250ZW50LmFwcGVuZENoaWxkKGdhbGxlcnlJbWFnZVNsaWRlcik7XHJcbiAgICAgICAgZ2FsbGVyeUltYWdlU2xpZGVyLmFwcGVuZENoaWxkKGltYWdlcyk7XHJcbiAgICAgICAgZ2FsbGVyeUNvbnRlbnQuYXBwZW5kQ2hpbGQoZ2FsbGVyeVRleHQpO1xyXG4gICAgICAgIGdhbGxlcnlUZXh0LmFwcGVuZENoaWxkKHRleHQpO1xyXG4gICAgICAgIHRleHQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZ2FsbGVyeSBJbWFnZVNsaWRlIGZ1bmN0aW9uIGlmIGNvbmRpdGlvbnMgYXJlIG1ldFxyXG4gICAgICAgIC8vIElmICd1cmwnIGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMVxyXG4gICAgICAgIGlmIChnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ10ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgcHJldiAvIG5leHQgYnV0dG9uXHJcbiAgICAgICAgICAgIGxldCBwcmV2QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICBwcmV2QnRuLmNsYXNzTmFtZSA9ICdwcmV2JztcclxuICAgICAgICAgICAgbGV0IG5leHRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgIG5leHRCdG4uY2xhc3NOYW1lID0gJ25leHQnO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHByZXYgLyBuZXh0IGJhY2tncm91bmQgZm9yIGJ1dHRvbiwgYW5kIGFkZCBjbGFzc1xyXG4gICAgICAgICAgICBsZXQgcHJldkJ0bkJnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICBwcmV2QnRuQmcuY2xhc3NOYW1lID0gJ3ByZXYtYnRuLWJnJztcclxuICAgICAgICAgICAgbGV0IG5leHRCdG5CZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgbmV4dEJ0bkJnLmNsYXNzTmFtZSA9ICduZXh0LWJ0bi1iZyc7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnNlcnQgYnV0dG9uIHRvIGJnIGJ1dHRvblxyXG4gICAgICAgICAgICBwcmV2QnRuQmcuYXBwZW5kQ2hpbGQocHJldkJ0bik7XHJcbiAgICAgICAgICAgIG5leHRCdG5CZy5hcHBlbmRDaGlsZChuZXh0QnRuKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzbGlkZUluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBkb3QgY29udGFpbmVyXHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJEb3RzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRvdHMuY2xhc3NOYW1lID0gJ2NvbnRhaW5lci1kb3RzJztcclxuXHJcbiAgICAgICAgICAgIC8vIEFsbCB0aGUgZG90IGluZGljYXRvciBzdG9yZWQgZm9yIGVhY2ggZ2FsbGVyeSBzZWN0aW9uXHJcbiAgICAgICAgICAgIGxldCBkb3RBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBkb3RzIChhcyBtYW55IGFzIHRoZSBpbWFnZXMgZXhpc3QpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FsbGVyeVByb3BlcnR5W2tleV1bJ3VybCddLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkb3RBcnJbal0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBkb3RBcnJbal0uY2xhc3NOYW1lID0gJ2RvdCc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGNsYXNzICcuYWN0aXZlJyB0byB0aGUgZmlyc3QgaW1hZ2Ugb24gZGlzcGxheVxyXG4gICAgICAgICAgICAgICAgaWYgKGogPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdEFycltqXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgRXZlbnQgTGlzdGVuZXIgZm9yIGRvdCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgIC8vIGlmIGEgZG90IGlzIHNlbGVjdGVkLCBhZGQgY2xhc3MgJy5hY3RpdmUnXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgcmVtb3ZlIG90aGVyIGRvdHMgb2YgdGhhdCBjbGFzc1xyXG4gICAgICAgICAgICAgICAgZG90QXJyW2pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0b2dnbGUgYWRkL3JlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdEFycltqXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNsYXNzICcuYWN0aXZlJyBmcm9tIG90aGVyIGRvdChzKSB0aGFuIHRoZSBvbmUgc2VsZWN0ZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdW5zZWxlY3RlZCA9IGRvdEFyci5maWx0ZXIoZnVuY3Rpb24gKGVsZW0pIHsgcmV0dXJuIGVsZW0gIT09IGRvdEFycltqXTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdW5zZWxlY3RlZC5sZW5ndGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bnNlbGVjdGVkW3hdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIFNsaWRlciBJbmRleCBhbmQgaW1hZ2Ugb24gZGlzcGxheVxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5zcmMgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ11bc2xpZGVJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLmFsdCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydhbHQnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2ZpZ2NhcHRpb24nXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckRvdHMuYXBwZW5kQ2hpbGQoZG90QXJyW2pdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIEV2ZW50IExpc3RlbmVyXHJcbiAgICAgICAgICAgIHByZXZCdG5CZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbmRpdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ3VybCddLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5zcmMgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ11bc2xpZGVJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLmFsdCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydhbHQnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2ZpZ2NhcHRpb24nXVtzbGlkZUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIGRvdCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERvdEFyciA9IGNvbnRhaW5lckRvdHMuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNvbnRhaW5lckRvdHMuY2hpbGROb2Rlcy5sZW5ndGg7IHkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG90QXJyW3ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gc2xpZGVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudERvdEFyclt5XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleC0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgaW1hZ2UgdXJsLCBhbHQgdGV4dCBhbmQgZmlnY2FwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5zcmMgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ11bc2xpZGVJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLmFsdCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydhbHQnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2ZpZ2NhcHRpb24nXVtzbGlkZUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hhbmdlIGRvdCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERvdEFyciA9IGNvbnRhaW5lckRvdHMuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNvbnRhaW5lckRvdHMuY2hpbGROb2Rlcy5sZW5ndGg7IHkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG90QXJyW3ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gc2xpZGVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudERvdEFyclt5XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBuZXh0QnRuQmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25kaXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ID09PSBnYWxsZXJ5UHJvcGVydHlba2V5XVsndXJsJ10ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXMuc3JjID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ3VybCddW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5hbHQgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsnYWx0J11bc2xpZGVJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWydmaWdjYXB0aW9uJ11bc2xpZGVJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoYW5nZSBkb3QgaW5kaWNhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREb3RBcnIgPSBjb250YWluZXJEb3RzLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjb250YWluZXJEb3RzLmNoaWxkTm9kZXMubGVuZ3RoOyB5ICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudERvdEFyclt5XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ID09IHNsaWRlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnREb3RBcnJbeV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXgrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzLnNyYyA9IGdhbGxlcnlQcm9wZXJ0eVtrZXldWyd1cmwnXVtzbGlkZUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXMuYWx0ID0gZ2FsbGVyeVByb3BlcnR5W2tleV1bJ2FsdCddW3NsaWRlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBnYWxsZXJ5UHJvcGVydHlba2V5XVsnZmlnY2FwdGlvbiddW3NsaWRlSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgZG90IGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50RG90QXJyID0gY29udGFpbmVyRG90cy5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY29udGFpbmVyRG90cy5jaGlsZE5vZGVzLmxlbmd0aDsgeSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnREb3RBcnJbeV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA9PSBzbGlkZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG90QXJyW3ldLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFwcGVuZCBkb3QtaW5kaWNhdG9yIGNvbnRhaW5lciwgZG90cywgcHJldiBidXR0b24sIG5leHQgYnV0dG9uXHJcbiAgICAgICAgICAgIGdhbGxlcnlJbWFnZVNsaWRlci5hcHBlbmRDaGlsZChjb250YWluZXJEb3RzKTtcclxuICAgICAgICAgICAgZ2FsbGVyeUltYWdlU2xpZGVyLmFwcGVuZENoaWxkKHByZXZCdG5CZyk7XHJcbiAgICAgICAgICAgIGdhbGxlcnlJbWFnZVNsaWRlci5hcHBlbmRDaGlsZChuZXh0QnRuQmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==
