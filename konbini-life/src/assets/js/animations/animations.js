console.log("Initiating animation");

const faders = document.querySelectorAll('.fade-in');

// Configurations: appear when the entire content is in view
const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -10px 0px"
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