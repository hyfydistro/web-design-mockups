console.log("Initiating animation");

// ! Safari does not support 'Intersection Observer', use polyfill

const mq600 = window.matchMedia("(max-width: 600px)");
const mq1024 = window.matchMedia("(max-width: 1024px)");

// Add-on class appear
const faders = document.querySelectorAll('.fader');
// Add-on class slide
// ? Specify direction if there's more
const sliders = document.querySelectorAll('.slider');
// Add-on class reveal
const revealers = document.querySelectorAll('.revealer');

// * Configurations: "fade-in"
// appear when the entire content is in view

// DEFAULT || FOR DESKTOP-TABLET
const appearOptions = {
    threshold: 1, // fires by how much the element is on display
    rootMargin: "0px 0px -100px 0px" // top right bottom left
};

// FOR MOBILE
const appearOptionsMobileView = {
    threshold: 0.5,
    rootMargin: "0px 0px 0px 0px"
};

// * Configurations: "slide-in"
// DEFAULT
const revealOptions = {
    threshold: 0.8,
    rootMargin: "0px 0px 0px 0px"
};

// * Configurations: "slide-in"
// DEFAULT
const sliderOptions = {
    threshold: 0.8,
    rootMargin: "0px 0px 45px 0px"
    // rootMargin: "0px 0px -250px 0px"
};


// # Sliders Event Listener

// const slideInOnScroll = new IntersectionObserver(function (entries, slideInOnScroll) {
//     entries.forEach(entry => {
//         if (!entry.isIntersecting) {
//             return;
//         } else {
//             entry.target.classList.add('slider');
//             slideInOnScroll.unobserve(entry.target);
//         }
//     });
// }, sliderOptions);

// sliders.forEach(slider => {
//     slideInOnScroll.observe(slider)
// })
// ! WIP - Only tested on mobile, need to develop for desktop (and tablet ?) size
// # REVEALERS
const revealOnScrollMobileView = new IntersectionObserver(function (entries, revealOnScrollMobileView) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('reveal');
            revealOnScrollMobileView.unobserve(entry.target);
        }
    });
}, revealOptions);

// # SLIDERS
const slideOnScrollMobileView = new IntersectionObserver(function (entries, slideOnScrollMobileView) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('slide');
            slideOnScrollMobileView.unobserve(entry.target);
        }
    });
}, sliderOptions);

revealers.forEach(revealer => {
    revealOnScrollMobileView.observe(revealer);
})

sliders.forEach(slider => {
    slideOnScrollMobileView.observe(slider);
})



// # Faders Event Listerner

if (mq600.matches) {
    // ! UNDER TESTING
    console.log("media query working");
    // # FADERS
    const appearOnScrollMobileView = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptionsMobileView);



    faders.forEach(fader => {
        appearOnScrollMobileView.observe(fader);
    })

} else {
    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    })
}
