let navBtn = document.querySelector('nav button');
  let menuList = document.querySelector('#menu');
  let nav = document.querySelector('.icon-container');
let hamburger = document.querySelector('.hamburger');

  // Default Settings

  document.addEventListener('DOMContentLoaded', function(event) {
    menuList.setAttribute('aria-hidden', true);
    menuList.style.display = 'none';
    navBtn.setAttribute('aria-expanded', false);
  });

    // Accessible controls

// let menuModule = document.createElement('div');
// menuModule.className = 'overlay';
// menuModule.style.display = 'none'
// document.body.appendChild(menuModule);

let menuModule = document.querySelector('.overlay');

    navBtn.addEventListener('click', function() {
        let expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        let ariaHidden = menuList.getAttribute('aria-hidden') === 'true' || false;
        menuList.setAttribute('aria-hidden', !ariaHidden);

        // Display and hides lists on click event listerner
        if (menuList.style.display == 'none') {
          menuList.style.display = 'block';
          nav.classList.toggle('open');
          navBtn.classList.toggle('open');
          menuList.classList.toggle('open');
          // hamburger.classList.toggle('open');
          menuModule.style.display = 'block';
          // nav.classList.toggle('menu-module');

        } else if (menuList.style.display == 'block') {
          menuList.style.display = 'none';
          nav.classList.toggle('open');
          navBtn.classList.toggle('open');
          menuList.classList.toggle('open');
          // hamburger.classList.toggle('open');
          menuModule.style.display = 'none';
          // nav.classList.toggle('menu-module');
        }
    });

menuModule.addEventListener('click', function() {
  menuList.style.display = 'none';
  nav.classList.toggle('open');
  navBtn.classList.toggle('open');
  menuList.classList.toggle('open');
  menuModule.style.display = 'none';
  icon.classList.toggle('active');
});
    // 'X' hamburger animations

    let icon = document.querySelector('.icon-container');

    navBtn.addEventListener("click", function() {
      icon.classList.toggle('active');
    });

// Check current menu and
// give color and disable click or cursor look.

// add event listener,
// if that comes back with the correct reference (href="#")
// Give new styles (bg color, and font color; disable click and cursor look)
// Also, everything should reset when visitng other pages of the sites.

// document.addEventListener();
