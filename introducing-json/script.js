// Pseudo Code
// On load, check size and
// if under 960px, do this
// if over 960px, do that

// On window resize, check size
// if under 960px, do this
// if over 960px, do that

// Defined Variables
// Menu components
let navBtn = document.querySelector("nav button");
let menuList = document.querySelector("#menu");
let menuListSet = document.querySelector("ul#menu");
let nav = document.querySelector(".icon-container");
let hamburger = document.querySelector(".hamburger");
// Overlay
let menuModule = document.querySelector(".overlay");
// Signify menu is close
let menuBoolean = false;
// Icon container
let icon = document.querySelector(".icon-container");
// (Related to scroll event listener)
let header = document.querySelector("header");
// (WAI-ARIA target)
let lastListItem = menuList.querySelector("#link-pdf");
// Media Queries
const maxWidth = window.matchMedia("(max-width: 960px)");
const minWidth = window.matchMedia("(min-width: 961px)");
// Back To Top Icon
let topIcon = document.querySelector(".back-to-top");

window.addEventListener("load", checkView);
window.addEventListener("resize", changeView);

function checkView() {
  if (maxWidth.matches) {
    // Initialise setup

    // Document Setup
    menuList.setAttribute("aria-hidden", true);
    menuListSet.style.display = "none";
    navBtn.setAttribute("aria-expanded", false);

    // Accessible controls
    navBtn.addEventListener("click", function () {
      let expanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !expanded);
      let ariaHidden = menuList.getAttribute("aria-hidden") === "true" || false;
      menuList.setAttribute("aria-hidden", !ariaHidden);

      // Display and hides lists on click event listerner
      menuStylesToggle();
    });

    // Assign an 'escape' key to menu when opened in mobile-tablet view.
    window.addEventListener("keydown", escapeMenuBtn);

    menuModule.addEventListener("click", function () {
      if (maxWidth.matches) {
        closeMenu();
        icon.classList.toggle("active");
      }
    });

    // 'X' hamburger animations
    navBtn.addEventListener("click", function () {
      if (maxWidth.matches) {
        icon.classList.toggle("active");
      }
    });

    // Add box shadow when on scroll.
    // If view is back to start, box shadow disappears.
    window.addEventListener("scroll", addDropShadow);

    // WAI-ARIA Support Feature
    lastListItem.addEventListener("keydown", function (e) {
      if (maxWidth.matches) {
        if (e.keyCode === 9) {
          // INCIDENTLY goes to the first list item available!
          navBtn.focus();
        }
      }
    });

    // * console.log("Set Things up - Pass1");
  } else if (minWidth.matches) {
    // Document Setup
    menuList.setAttribute("aria-hidden", false);
    // menuList.style.display = 'block';
    navBtn.setAttribute("aria-expanded", true);

    // * console.log("Set Nothing up - Pass1");
  }
}

function changeView() {
  // On resize, check if below 960px
  // If so, add default Initialise settings

  if (maxWidth.matches) {
    // Document Setup
    menuList.setAttribute("aria-hidden", true);
    menuListSet.style.display = "none";
    navBtn.setAttribute("aria-expanded", false);

    // Accessible controls
    navBtn.addEventListener("click", function () {
      let expanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !expanded);
      let ariaHidden = menuList.getAttribute("aria-hidden") === "true" || false;
      menuList.setAttribute("aria-hidden", !ariaHidden);

      // Display and hides lists on click event listerner
      menuStylesToggle();
    });

    // event listeners
    window.addEventListener("keydown", escapeMenuBtn);

    menuModule.addEventListener("click", function () {
      if (maxWidth.matches) {
        closeMenu();
        icon.classList.toggle("active");
      }
    });

    // 'X' hamburger animations
    navBtn.addEventListener("click", function () {
      if (maxWidth.matches) {
        icon.classList.toggle("active");
      }
    });

    // Add box shadow when on scroll.
    // If view is back to start, box shadow disappears.
    window.addEventListener("scroll", addDropShadow);

    // WAI-ARIA Support Feature
    lastListItem.addEventListener("keydown", function (e) {
      if (maxWidth.matches) {
        if (e.keyCode === 9) {
          // INCIDENTLY goes to the first list item available!
          navBtn.focus();
        }
      }
    });

    // Assign an 'escape' key to menu when opened in mobile-tablet view.
    // * console.log("Redo on Resize - Pass2");
  } else if (minWidth.matches) {
    // width over 960 change view
    // Document Setup
    // Uncheck checkView
    menuList.setAttribute("aria-hidden", false);
    menuList.style.display = "block";
    navBtn.setAttribute("aria-expanded", true);

    // Remove box shadow when on scroll.
    // If view is back to start, box shadow disappears.
    // window.removeEventListener('scroll', addDropShadow);

    // * console.log("Undo on Resize - Pass2");
  }
}

// Listen for a certain scroll down to reveal Back To Top icon
window.addEventListener("scroll", function revealIcon() {
  // when two pages down of viewport size, reveal icon
  topIcon.classList.toggle("reveal", window.scrollY > 0);
});

topIcon.addEventListener("click", function topLink() {
  window.scrollTo(0, 0);
});

// Defined Function
function menuStylesToggle() {
  if (menuList.style.display == "none") {
    openMenu();
  } else if (menuList.style.display == "block") {
    closeMenu();
  }
}

function openMenu() {
  menuModule.style.display = "block";
  menuList.style.display = "block";
  menuList.classList.toggle("open");
  nav.classList.toggle("open");
  navBtn.classList.toggle("open");
  menuBoolean = true;
}

function closeMenu() {
  menuModule.style.display = "none";
  menuList.style.display = "none";
  menuList.classList.toggle("open");
  nav.classList.toggle("open");
  navBtn.classList.toggle("open");
  menuBoolean = false;
}

function escapeMenuBtn(e) {
  if (maxWidth.matches) {
    if (e.keyCode === 27 && menuBoolean === true) {
      closeMenu();
      icon.classList.toggle("active");
    }
  }
}

function addDropShadow() {
  if (maxWidth.matches) {
    header.classList.add("scrolling-active", window.scrollY > 0);
  } else {
    if (minWidth.matches) {
      header.classList.remove("scrolling-active");
    }
  }
}

// Service Worker
if ("serviceWorker" in navigator) {
  // * console.log("SW is supported");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("Service Worker: Registered"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}
