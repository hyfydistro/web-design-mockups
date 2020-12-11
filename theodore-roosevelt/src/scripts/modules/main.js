// main module

// CTA "Read More"
// For Mobile

const readMoreBtn = document.querySelectorAll('.read-more-btn');
const moreText = document.querySelectorAll('.more');
const dots = document.querySelectorAll('.dots');
const doubleArrowSymbol = document.querySelectorAll('.double-arrow-symbol');
const ContainerReadMoreBtn = document.querySelectorAll('.container-read-more-btn');

const timelineWrappers = document.querySelectorAll('.timeline-wrap');

const timelineBgEnd = document.querySelector('.timeline-bg-dot.end');
// todo
// Add more content to object literal (the data)
// Create media query
// Create for Desktop display

const timelineItems = document.querySelectorAll('.timeline-item');
// galleryContainer
let isOpened = false;
for (let i = 0; i < readMoreBtn.length; i += 1) {
    readMoreBtn[i].addEventListener('click', function moreContent() {

        console.log(i);

        if (!isOpened) {
            console.log("open" + i);
            dots[i].style.display = 'none';
            moreText[i].style.display = 'inline';
            readMoreBtn[i].innerHTML = '<span class="double-arrow-symbol">&laquo;</span> READ LESS ';
            ContainerReadMoreBtn[i].style.justifyContent = 'flex-end';
            ContainerReadMoreBtn[i].classList.add('open');
            galleryContainer[i].classList.add('open');
            timelineWrappers[i + 1].classList.add('open');

            timelineWrappers[i].insertAdjacentElement('afterend', ContainerReadMoreBtn[i]);
            timelineWrappers[i].insertAdjacentElement('afterend', galleryContainer[i]);

            isOpened = true;

            // Special stylize for uniqeu situations
            if (i == readMoreBtn.length - 2) {
                timelineBgEnd.classList.add('special');
            }
        } else {
            console.log('close');
            dots[i].style.display = 'inline';
            moreText[i].style.display = 'none';
            readMoreBtn[i].innerHTML = 'READ MORE <span class="double-arrow-symbol">&raquo;</span>';
            ContainerReadMoreBtn[i].style.justifyContent = 'flex-start';
            ContainerReadMoreBtn[i].classList.remove('open');
            galleryContainer[i].classList.remove('open');
            timelineWrappers[i + 1].classList.remove('open');

            timelineItems[i].insertAdjacentElement('beforeend', galleryContainer[i]);
            timelineItems[i].insertAdjacentElement('beforeend', ContainerReadMoreBtn[i]);

            isOpened = false;

            // Special stylize for uniqeu situations
            if (i == readMoreBtn.length - 2) {
                timelineBgEnd.classList.remove('special');
            }
        }
    });
}


const galleryProperty = {
    '0000': {
        'index': 0,
        'url': ['images/tr-age11-paris-209w.jpg', 'images/Birthplace-from-west-sml-600w.jpg'],
        'alt': ['Theodore Roosevelt 11 years old at Paris.', 'Manhattan'],
        'figcaption': ['T.R. 11 years old. (Paris)', 'Manhattan']
    },
    '0001': {
        'index': 1,
        'url': ['images/tr-avid-boxer-at-harvard-sml-600w.jpg'],
        'alt': ['Theodore Roosevelt Boxing.'],
        'figcaption': ['T.R. boxing']
    },
    '0003': {
        'index': 2,
        'url': ['images/tr-age11-paris-209w.jpg', 'images/Birthplace-from-west-sml-600w.jpg'],
        'alt': ['Theodore Roosevelt 11 years old at Paris.', 'Manhattan'],
        'figcaption': ['T.R. 11 years old. (Paris)', 'Manhattan']
    }
};

const timelineItem = document.querySelector('.timeline-item');
const galleryContainer = document.querySelectorAll('.gallery');

// ! Creating Gallery

for (let key in galleryProperty) {
    // # Create '.gallery__content',
    // '.gallery__image',
    // 'gallery__text',
    // 'p' element,
    // # Create an Event Listener
    // textNode alt text for each image [Storage] >> Add Event Listener
    // textNode figcaption for each image [Storage] >> Add Event Listener
    // images for each image [Storage] >> Add Event Listener
    // # Creat IF condition is met
    // If there is more than one image url stored
    // Create span Tags for dot indicators
    // Add Event Listener
    // When 'click' show current slide
    // function currentSlide()
    // Create prev / next button to look through images
    // Add Event Listener
    // When 'click' move previous or next
    // Disable  prev / next when at the end or beginning of length.

    // Create '.gallery__content'
    let galleryContent = document.createElement('div');
    galleryContent.className = 'gallery__content';
    // Create '.gallery__image'
    let galleryImageSlider = document.createElement('div');
    galleryImageSlider.className = 'gallery__image';
    // Create '.gallery__text'
    let galleryText = document.createElement('div');
    galleryText.className = 'gallery__text';

    console.log(galleryProperty[key]['url'][0]);

    // Create 'p' element
    let text = document.createElement('p');
    // Create 'image' element
    let images = document.createElement('img');
    // Create textNode for the first element of the array
    let textNode = document.createTextNode(galleryProperty[key]['figcaption'][0]);

    // Set up first image to display as default
    // Append images
    images.src = galleryProperty[key]['url'][0];
    images.alt = galleryProperty[key]['alt'][0];

    // Append textNode
    text.appendChild(textNode);

    // Create gallery ImageSlide function if conditions are met
    // If 'url' length is greater than 1
    if (galleryProperty[key]['url'].length > 1) {
        // Create prev / next button
        let prevBtn = document.createElement('a');
        prevBtn.className = 'prev';
        let nextBtn = document.createElement('a');
        nextBtn.className = 'next';

        let slideIndex = 0;

        // Create dot container
        let containerDots = document.createElement('div');
        containerDots.className = 'container-dots';

        // All the dot indicator stored for each gallery section
        let dotArr = [];

        // Create dots (as many as the images exist)
        for (let j = 0; j < galleryProperty[key]['url'].length; j += 1) {
            dotArr[j] = document.createElement('span');
            dotArr[j].className = 'dot';

            // Add class '.active' to the first image on display
            if (j == 0) {
                dotArr[j].classList.toggle('active');
            }

            // Create Event Listener for dot indicator
            // if a dot is selected, add class '.active'
            // and remove other dots of that class
            dotArr[j].addEventListener('click', function () {
                // add toggle add/remove class
                dotArr[j].classList.toggle('active');

                // Remove class '.active' from other dot(s) than the one selected
                let unselected = dotArr.filter(function (elem) { return elem !== dotArr[j]; });

                for (let x = 0; x < unselected.length; x += 1) {
                    unselected[x].classList.remove('active');
                }

                // Change Slider Index and image on display
                slideIndex = j;
                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];
            });

            containerDots.appendChild(dotArr[j]);
            console.log(dotArr[j]);
        }

        console.log(containerDots);
        containerDots.childNodes[0].classList.add('active');
        console.log(containerDots.childNodes[0].classList);
        console.log(containerDots.childNodes.length);

        // Add Event Listener
        prevBtn.addEventListener('click', function () {
            // Condition
            if (slideIndex === 0) {
                slideIndex = galleryProperty[key]['url'].length - 1;

                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];

                // Change dot indicator
                let currentDotArr = containerDots.childNodes;
                for (let y = 0; y < containerDots.childNodes.length; y+=1) {
                    currentDotArr[y].classList.remove('active');

                    if (y == slideIndex) {
                        currentDotArr[y].classList.add('active');
                    }
                }
            } else {
                slideIndex--;

                // Change image url, alt text and figcaption
                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];

                // Change dot indicator
                let currentDotArr = containerDots.childNodes;
                for (let y = 0; y < containerDots.childNodes.length; y+=1) {
                    currentDotArr[y].classList.remove('active');

                    if (y == slideIndex) {
                        currentDotArr[y].classList.add('active');
                    }
                }
            }
        });

        nextBtn.addEventListener('click', function () {
            // Condition
            if (slideIndex === galleryProperty[key]['url'].length - 1) {
                slideIndex = 0;

                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];

                // Change dot indicator
                let currentDotArr = containerDots.childNodes;
                for (let y = 0; y < containerDots.childNodes.length; y+=1) {
                    currentDotArr[y].classList.remove('active');

                    if (y == slideIndex) {
                        currentDotArr[y].classList.add('active');
                    }
                }
            } else {
                slideIndex++;

                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];

                // Change dot indicator
                let currentDotArr = containerDots.childNodes;
                for (let y = 0; y < containerDots.childNodes.length; y+=1) {
                    currentDotArr[y].classList.remove('active');

                    if (y == slideIndex) {
                        currentDotArr[y].classList.add('active');
                    }
                }
            }
        });

        // Append dot-indicator container, dots, prev button, next button
        galleryImageSlider.appendChild(containerDots);
        galleryImageSlider.appendChild(prevBtn);
        galleryImageSlider.appendChild(nextBtn);
    }

    // # Append the whole gallery content together
    text.appendChild(textNode);
    galleryText.appendChild(text);
    galleryImageSlider.appendChild(images);
    galleryContent.appendChild(galleryImageSlider);
    galleryContent.appendChild(galleryText);

    let index = galleryProperty[key]['index'];

    galleryContainer[index].appendChild(galleryContent);
}