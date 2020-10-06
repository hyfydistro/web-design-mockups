console.log("Initiating animation");

const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

// * Configurations: "fade-in"
// appear when the entire content is in view

// DEFAULT || FOR DESKTOP-TABLET
const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -100px 0px"
};

// FOR MOVILE
const appearOptionsMobileView = {
    threshold: 1,
    rootMargin: "0px 0px 0px 0px"
};

// * Configurations: "slide-in"

// DEFAULT
const sliderOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
};


// # Sliders Event Listener

const slideInOnScroll = new IntersectionObserver(function(entries, slideInOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            slideInOnScroll.unobserve(entry.target);
        }
    });
}, sliderOptions);

sliders.forEach(slider => {
    slideInOnScroll.observe(slider)
})

const mq = window.matchMedia("(max-width: 600px)");

// # Faders Event Listerner

if (mq.matches) {
    // ! UNDER TESTING
    console.log("media query working");
    const appearOnScrollMobileView = new IntersectionObserver(function(entries, appearOnScroll) {
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
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
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
