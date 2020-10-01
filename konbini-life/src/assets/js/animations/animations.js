console.log("Initiating animation");

const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

// Configurations: appear when the entire content is in view
const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -10px 0px"
};

// Slide in Configurations
const sliderOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
};

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

// todo:
// - slide effect appearance for section "characters"
// - add slide in from side
// - use 'slide-in' class

// const slideInOnScroll = new IntersectionObserver(function(entries, ))

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


// Sliders

sliders.forEach(slider => {
    slideInOnScroll.observe(slider)
})