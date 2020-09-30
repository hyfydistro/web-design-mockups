console.log("Initialise gallery script...");

// gallery #1
const gallery1 = document.querySelector('.container-frame-one');
const gallery1Image = document.querySelector('.container-frame-one img');
const gallery1Source = document.querySelector('.container-frame-one source');
// gallery #2
const gallery2 = document.querySelector('.container-frame-two');
const gallery2Image = document.querySelector('.container-frame-two img');
const gallery2Source = document.querySelector('.container-frame-two source');
// module #1
const module1 = document.querySelector('.module-one');
const module1Image = document.querySelector('.module-one img');
// module #2
const module2 = document.querySelector('.module-two');
const module2Image = document.querySelector('.module-two img');
// close buttons
const closeBtn1 = document.querySelector('.module-one .close');
const closeBtn2 = document.querySelector('.module-two .close');

const salesPitchContainer = document.querySelector('.container-sales-pitch');
// const overlay = document.querySelector('.overlay');

// click event for gallery #1
gallery1.addEventListener('click', function() {
    module1.style.display = 'block';
    salesPitchContainer.style.zIndex= '-1';

    if (window.innerWidth > 600) {
        module1Image.src = gallery1Image.src;
    } else {
        module1Image.src = gallery1Source.srcset;
    }

    disableScroll();
});

closeBtn1.addEventListener('click', function() {
    module1.style.display = 'none';
    salesPitchContainer.style.zIndex= '66';
    enableScroll();
})

// click event for gallery #2
gallery2.addEventListener('click', function() {
    module2.style.display = 'block';
    salesPitchContainer.style.zIndex= '-1';

    if (window.innerWidth > 600) {
        module2Image.src = gallery2Image.src;
    } else {
        module2Image.src = gallery2Source.srcset;
    }

    disableScroll();
});

closeBtn2.addEventListener('click', function() {
    module2.style.display = 'none';
    salesPitchContainer.style.zIndex= '66';
    enableScroll();
})

// CANCEL SCROLL INTERACTION

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}