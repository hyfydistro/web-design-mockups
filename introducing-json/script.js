// document.documentElement.clientWidth
//
// If window's width is greater than 960px, apply the following
 // TODO: WIP
// window.addEventListener('resize', mobileToTabletEvents);
//
// const mq = window.matchMedia("(max-width: 960px)");
//
// let width = document.body.clientWidth;
//
// function mobileToTabletEvents() {
//   // if (mq.matches) {
//   if (width < 960) {
//     // if (window.screen.availWidth < 960) {
//     // if (window.screen.width < 960) {
//
//
//
//   }
// }

window.addEventListener('load', checkView);

function checkView() {
  const mq = window.matchMedia("(max-width: 960px)");
  // let width = document.body.clientWidth;
  let width = document.documentElement.clientWidth;
  console.log(width);

  if (mq.matches) {
    // TEST
  // if (width < 960) {
    console.log("Hello world");
    console.log(width);

    // Initialise setup
  }
}

// Defined Varibales
// Menu components
let navBtn = document.querySelector('nav button');
let menuList = document.querySelector('#menu');
let nav = document.querySelector('.icon-container');
let hamburger = document.querySelector('.hamburger');
// Overlay
let menuModule = document.querySelector('.overlay');
// Signify menu is close
let menuBoolean = false;
// Icon container
let icon = document.querySelector('.icon-container');
// (Related to scroll event listener)
let header = document.querySelector('header');
// (WAI-ARIA target)
let lastListItem = menuList.querySelector('#link-pdf');


// Default Settings / Resets / Progressive Enhancement
document.addEventListener('DOMContentLoaded', function() {
  menuList.setAttribute('aria-hidden', true);
  menuList.style.display = 'none';
  navBtn.setAttribute('aria-expanded', false);
});


// Accessible controls
navBtn.addEventListener('click', function() {
  let expanded = this.getAttribute('aria-expanded') === 'true' || false;
  this.setAttribute('aria-expanded', !expanded);
  let ariaHidden = menuList.getAttribute('aria-hidden') === 'true' || false;
  menuList.setAttribute('aria-hidden', !ariaHidden);

  // Display and hides lists on click event listerner
  menuStylesToggle();
});

function menuStylesToggle() {
  if (menuList.style.display == 'none') {
    openMenu();
  } else if (menuList.style.display == 'block') {
    closeMenu();
  }
}

function openMenu() {
  menuModule.style.display = 'block';
  menuList.style.display = 'block';
  menuList.classList.toggle('open');
  nav.classList.toggle('open');
  navBtn.classList.toggle('open');
  menuBoolean = true;
}

function closeMenu() {
  menuModule.style.display = 'none';
  menuList.style.display = 'none';
  menuList.classList.toggle('open');
  nav.classList.toggle('open');
  navBtn.classList.toggle('open');
  menuBoolean = false;
}

// Assign an 'escape' key to menu when opened in mobile-tablet view.
window.addEventListener('keydown', escapeMenuBtn);

function escapeMenuBtn(e) {
  if (e.keyCode === 27 && menuBoolean === true) {
    closeMenu();
    icon.classList.toggle('active');
  }
}

menuModule.addEventListener('click', function() {
  closeMenu();
  icon.classList.toggle('active');
});

// 'X' hamburger animations
navBtn.addEventListener("click", function() {
  icon.classList.toggle('active');
});

// Add box shadow when on scroll.
// If view is back to start, box shadow disappears.
window.addEventListener('scroll', function addDropShadow() {
  header.classList.toggle('scrolling-active', window.scrollY > 0);
});

// WAI-ARIA Support Feature
lastListItem.addEventListener('keydown', function(e) {
  if (e.keyCode === 9) {
    // INCIDENTLY goes to the first list item available!
    navBtn.focus();
  }
});
