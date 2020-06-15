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

// TODO:
// Try: Move all the event listners inside
// Test on 'resize' event listener

// Initialisation

// On load, check size and
// if under 960px, do this
// if over 960px, do that

// On window resize, check size
// if under 960px, do this
// if over 960px, do that

// Defined Varibales
// Menu components
let navBtn = document.querySelector('nav button');
let menuList = document.querySelector('#menu');
let menuListSet = document.querySelector('ul#menu');
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

let width = document.documentElement.clientWidth;

const maxWidth = window.matchMedia("(max-width: 960px)");
const minWidth = window.matchMedia("(min-width: 961px)");

window.addEventListener('load', checkView);
window.addEventListener('resize', changeView);

// window.addEventListener('resize', changeView);
// let width = document.documentElement.clientWidth;

function checkView() {
  // console.log(width);
  // let width = document.body.clientWidth;

  // if (maxWidth.matches ) {
  if (maxWidth.matches) {


    // TODO:
    // Initialise setup

      // Document Setup
      menuList.setAttribute('aria-hidden', true);
      menuListSet.style.display = 'none';
      navBtn.setAttribute('aria-expanded', false);

      // Accessible controls
      navBtn.addEventListener('click', function() {
        let expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        let ariaHidden = menuList.getAttribute('aria-hidden') === 'true' || false;
        menuList.setAttribute('aria-hidden', !ariaHidden);

        // Display and hides lists on click event listerner
        menuStylesToggle();
      });

      // Assign an 'escape' key to menu when opened in mobile-tablet view.
      window.addEventListener('keydown', escapeMenuBtn);

      menuModule.addEventListener('click', function() {
        if (maxWidth.matches) {
        closeMenu();
        icon.classList.toggle('active');
      }
      });

      // 'X' hamburger animations
      navBtn.addEventListener("click", function() {
        if (maxWidth.matches) {

        icon.classList.toggle('active');
      }
      });

      // Add box shadow when on scroll.
      // If view is back to start, box shadow disappears.
      window.addEventListener('scroll', function addDropShadow() {
        if (maxWidth.matches) {

        header.classList.toggle('scrolling-active', window.scrollY > 0);
      }
      });

      // WAI-ARIA Support Feature
      lastListItem.addEventListener('keydown', function(e) {
        if (maxWidth.matches) {

        if (e.keyCode === 9) {
          // INCIDENTLY goes to the first list item available!
          navBtn.focus();
        }
      }
      });

      console.log('Set Things up - Pass1');

  } else if (minWidth.matches) {
    // if (minWidth.matches) {
      // Document Setup
      menuList.setAttribute('aria-hidden', false);
      // menuList.style.display = 'block';
      navBtn.setAttribute('aria-expanded', true);

      // Accessible controls
      // navBtn.addEventListener('click', function() {
      //   let expanded = this.getAttribute('aria-expanded') === 'true' || false;
      //   this.setAttribute('aria-expanded', !expanded);
      //   let ariaHidden = menuList.getAttribute('aria-hidden') === 'true' || false;
      //   menuList.setAttribute('aria-hidden', !ariaHidden);
      //
      //   // Display and hides lists on click event listerner
      //   menuStylesToggle();
      // });

      // Add box shadow when on scroll.
      // If view is back to start, box shadow disappears.
      // window.removeEventListener('scroll', function addDropShadow() {
      //   header.classList.toggle('scrolling-active', window.scrollY > 0);
      // });

      console.log('Set Nothing up - Pass1');
  }
}

function changeView() {
  // On resize, check if below 960px
  // If so, add default Initialise settings

  if (maxWidth.matches) {
    // Document Setup
    menuList.setAttribute('aria-hidden', true);
    menuListSet.style.display = 'none';
    navBtn.setAttribute('aria-expanded', false);

    // Accessible controls
    navBtn.addEventListener('click', function() {
      let expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      let ariaHidden = menuList.getAttribute('aria-hidden') === 'true' || false;
      menuList.setAttribute('aria-hidden', !ariaHidden);

      // Display and hides lists on click event listerner
      menuStylesToggle();
    });


    // event listeners
    window.addEventListener('keydown', escapeMenuBtn);

    menuModule.addEventListener('click', function() {
      if (maxWidth.matches) {
        closeMenu();
        icon.classList.toggle('active');
      }
        });

    // 'X' hamburger animations
    navBtn.addEventListener("click", function() {
      if (maxWidth.matches) {
      icon.classList.toggle('active');
    }
    });

    // Add box shadow when on scroll.
    // If view is back to start, box shadow disappears.
    window.addEventListener('scroll', function addDropShadow() {
      if (maxWidth.matches) {
      header.classList.toggle('scrolling-active', window.scrollY > 0);
    }
    });

    // WAI-ARIA Support Feature
    lastListItem.addEventListener('keydown', function(e) {
      if (maxWidth.matches) {

      if (e.keyCode === 9) {
        // INCIDENTLY goes to the first list item available!
        navBtn.focus();
      }
    }
    });


    // Assign an 'escape' key to menu when opened in mobile-tablet view.
    console.log('Redo on Resize - Pass2')

  } else if (minWidth.matches) {
    // width over 960 change view
    // Uncheck checkView
      // Document Setup
      menuList.setAttribute('aria-hidden', false);
      // menuList.style.display = 'block';
      navBtn.setAttribute('aria-expanded', true);

      // Accessible controls
      // navBtn.addEventListener('click', function() {
      //   let expanded = this.getAttribute('aria-expanded') === 'true' || false;
      //   this.setAttribute('aria-expanded', !expanded);
      //   let ariaHidden = menuList.getAttribute('aria-hidden') === 'true' || false;
      //   menuList.setAttribute('aria-hidden', !ariaHidden);
      //
      //   // Display and hides lists on click event listerner
      //   menuStylesToggle();
      // });

      // Add box shadow when on scroll.
      // If view is back to start, box shadow disappears.
      window.removeEventListener('scroll', function addDropShadow() {
        header.classList.toggle('scrolling-active', window.scrollY > 0);
      });

      console.log('Undo on Resize - Pass2');
  }

}


// Add event listener on 'resize'



// Default Settings / Resets / Progressive Enhancement
document.addEventListener('DOMContentLoaded', function() {

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
  // menuListSet.style.display = 'block';
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

function escapeMenuBtn(e) {
  if (maxWidth.matches) {

  if (e.keyCode === 27 && menuBoolean === true) {
    closeMenu();
    icon.classList.toggle('active');
  }
}
}
