console.log("Initiating animation");

const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

// Configurations: appear when the entire content is in view
const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -180px 0px"
};

// Slide in Configurations
const sliderOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
};

// Faders Event Listerner

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

// Sliders Event Listener

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