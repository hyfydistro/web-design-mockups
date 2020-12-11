// main module

// CTA "Read More"
// For Mobile

const readMoreBtn = document.querySelectorAll('.read-more-btn');
const moreText = document.querySelectorAll('.more');
const dots = document.querySelectorAll('.dots');
const doubleArrowSymbol = document.querySelectorAll('.double-arrow-symbol');
const ContainerReadMoreBtn = document.querySelectorAll('.container-read-more-btn');

// todo
// Move back and from '.container-read-more-btn' inside, and
// outside of '.timeline-item' SECOND - order matters!
// Move back and from '.gallery' inside, and
// outside of '.timeline-item' FIRST

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
            // ! APPLY to open and close CTA 'READ MORE
            // toggle classlist:
            // - edit margin bot to space-lv1 + space-lv2
            // timelineItem.classList.add('open');

            timelineItems[i].insertAdjacentElement('afterend', ContainerReadMoreBtn[i]);
            timelineItems[i].insertAdjacentElement('afterend', galleryContainer[i]);

            isOpened = true;
        } else {
            console.log('close');
            dots[i].style.display = 'inline';
            moreText[i].style.display = 'none';
            readMoreBtn[i].innerHTML = 'READ MORE <span class="double-arrow-symbol">&raquo;</span>';
            ContainerReadMoreBtn[i].style.justifyContent = 'flex-start';
            ContainerReadMoreBtn[i].classList.remove('open');
            galleryContainer[i].classList.remove('open');
            // toggle classlist:
            // - edit margin bot to space-lv2
            // timelineItem.classList.remove('open');

            timelineItems[i].insertAdjacentElement('beforeend', galleryContainer[i]);
            timelineItems[i].insertAdjacentElement('beforeend', ContainerReadMoreBtn[i]);

            isOpened = false;
        }
    });
}

// ! Test
// const galleryProperty = [
// {    '0000': {
//         'url': ['images/tr-age11-paris-209w.jpg', 'images/Birthplace-from-west-sml-600w.jpg'],
//         'alt': 'Theodore Roosevelt 11 years old at Paris.',
//         'figcaption': 'T.R. 11 years old. (Paris)'
//     }},
// {    '0001': {
//     'url': ['images/tr-avid-boxer-at-harvard-sml-600w.jpg'],
//     'alt': 'Theodore Roosevelt 11 years old at Paris.',
//     'figcaption': 'T.R. 11 years old. (Paris)'
// }}
// ];

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

// for (let y = 0; y < galleryContainer.length; y += 1) {
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

    // ! WIP
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

        // ? Create a Radio button instead ???
        // Create dot container
        let containerDots = document.createElement('div');
        containerDots.className = 'container-dots';

        // All the dot indicator stored for each gallery section
        let dotArr = [];

        // Create dots (as many as the images exist)
        for (let j = 0; j < galleryProperty[key]['url'].length; j += 1) {
            dotArr[j] = document.createElement('span');
            dotArr[j].className = 'dot';
            // ? To create span tag or radio tag???
            // dotArr[j].setAttribute('type', 'radio');
            // dotArr[j].setAttribute('name', 'radio-btn');
            // dotArr[j].htmlFor = `radio${j}`

            // Add class '.active' to the first image on display
            if (j == 0) {
                dotArr[j].classList.toggle('active');
            }

            // Create Event Listener for dot indicator
            // if a dot is selected, add class '.active'
            // and remove other dots of that class
            dotArr[j].addEventListener('click', function() {
                // add toggle add/remove class
                dotArr[j].classList.toggle('active');

                // Remove class '.active' from other dot(s) than the one selected
                let unselected = dotArr.filter(function(elem) { return elem !== dotArr[j]; });

                for (let x = 0; x < unselected.length; x+=1) {
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

        // Add Event Listener
        prevBtn.addEventListener('click', function () {
            // Condition
            if (slideIndex === 0) {
                slideIndex = galleryProperty[key]['url'].length - 1;

                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];
            } else {
                slideIndex--;

                // Change image url, alt text and figcaption
                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];

                // Change dot indicator

            }

        });

        nextBtn.addEventListener('click', function () {
            // Condition
            if (slideIndex === galleryProperty[key]['url'].length - 1) {
                slideIndex = 0;

                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];
            } else {
                slideIndex++;

                images.src = galleryProperty[key]['url'][slideIndex];
                images.alt = galleryProperty[key]['alt'][slideIndex];
                text.textContent = galleryProperty[key]['figcaption'][slideIndex];

                // Change dot indicator

            }

        });

        // Append dot-indicator container, dots, prev button, next button
        galleryImageSlider.appendChild(containerDots);
        galleryImageSlider.appendChild(prevBtn);
        galleryImageSlider.appendChild(nextBtn);
    }

    // Append the whole gallery content together
    text.appendChild(textNode);
    galleryText.appendChild(text);
    galleryImageSlider.appendChild(images);
    galleryContent.appendChild(galleryImageSlider);
    galleryContent.appendChild(galleryText);

    let index = galleryProperty[key]['index'];

    galleryContainer[index].appendChild(galleryContent);


    // Append prev/next buttons if conditions met

    // if (galleryContainer[0]) {
    //     // # Image element setup
    //     // Create image element(s)
    //     // Cssign source file
    //     // Assign alt text
    //     // Create div element with class name 'gallery__text'
    //     // Create p element - 'text'
    //     // Create text node assigned with figcaption
    //     // Append 'textNode' to p element 'text'
    //     // Append 'text' to div element 'gallery__text'
    //     for (let x = 0; x < galleryProperty['0000']['url'].length; x += 1) {
    //         let images = document.createElement('img');
    //         images.src = galleryProperty['0000']['url'][x];
    //         images.alt = galleryProperty['0000']['alt'][x];

    //         // Create gallery text
    //         let textNode = document.createTextNode(galleryProperty['0000']['figcaption'][x]);

    //         text.appendChild(textNode);
    //         galleryText.appendChild(text);

    //         galleryImageSlider.appendChild(images)
    //         galleryContent.appendChild(galleryText);
    //     }

    //     // Determine whether to add prev/next button
    //     if (galleryProperty['0000']['url'].length > 1) {
    //         // Create CTA pre / next buttons
    //         let prevBtn = document.createElement('a');
    //         prevBtn.className = 'prev';
    //         let nextBtn = document.createElement('a');
    //         nextBtn.className = 'next';

    //         // Create dot(s) indicator
    //         let dotNav = document.createElement('div');
    //         dotNav.className = 'container-nav-dot';

    //         // for (let z = 0; z < galleryProperty['0000']['url'].length; z+=1) {
    //         //     let dots = document.createElement('span');
    //         //     dots.className = 'nav-dots';
    //         // }
    //     }

    // # Append to '.containerGallery'
    // galleryContent.appendChild(galleryImageSlider);
    // containerGallery.appendChild(galleryContent);

    // }

}


// ! Test#3
// for (const key in galleryProperty) {
//     for (const value in key) {
//         console.log(value['url']);
//     }
// }


// // ! Tes#2
// for (const property in galleryProperty) {
//     let galleryContent = document.createElement('div');
//     galleryContent.className = 'gallery__content';
//     let galleryImageSlider = document.createElement('div');
//     galleryImageSlider.className = 'gallery__image';

//     console.log('inside ' + property);

//     // if (property == '0000') {
//     console.log(property['url']);

//     // # Image element setup
//     // Create image element(s)
//     // Cssign source file
//     // Assign alt text
//     // Create div element with class name 'gallery__text'
//     // Create p element - 'text'
//     // Create text node assigned with figcaption
//     // Append 'textNode' to p element 'text'
//     // Append 'text' to div element 'gallery__text'
//     for (let x = 0; x < property['url'].length; x += 1) {
//         console.log('loop starting');

//         let images = document.createElement('img');
//         images.src = property['url'][x];
//         images.alt = property['alt'][x];

//         // Create gallery text
//         let galleryText = document.createElement('div');
//         galleryText.className = 'gallery__text';
//         let text = document.createElement('p');
//         let textNode = document.createTextNode(property['figcaption'][x]);

//         text.appendChild(textNode);
//         galleryText.appendChild(text);

//         galleryImageSlider.appendChild(images)
//         galleryContent.appendChild(galleryText);
//     }
//     // }

//     // Append images
//     // Append prev/next buttons if conditions met

//     // if (galleryContainer[0]) {
//     //     // # Image element setup
//     //     // Create image element(s)
//     //     // Cssign source file
//     //     // Assign alt text
//     //     // Create div element with class name 'gallery__text'
//     //     // Create p element - 'text'
//     //     // Create text node assigned with figcaption
//     //     // Append 'textNode' to p element 'text'
//     //     // Append 'text' to div element 'gallery__text'
//     //     for (let x = 0; x < galleryProperty['0000']['url'].length; x += 1) {
//     //         let images = document.createElement('img');
//     //         images.src = galleryProperty['0000']['url'][x];
//     //         images.alt = galleryProperty['0000']['alt'][x];

//     //         // Create gallery text
//     //         let galleryText = document.createElement('div');
//     //         galleryText.className = 'gallery__text';
//     //         let text = document.createElement('p');
//     //         let textNode = document.createTextNode(galleryProperty['0000']['figcaption'][x]);

//     //         text.appendChild(textNode);
//     //         galleryText.appendChild(text);

//     //         galleryImageSlider.appendChild(images)
//     //         galleryContent.appendChild(galleryText);
//     //     }

//     // Determine whether to add prev/next button
//     if (property['url'].length > 1) {
//         // Create CTA pre / next buttons
//         let prevBtn = document.createElement('a');
//         prevBtn.className = 'prev';
//         let nextBtn = document.createElement('a');
//         nextBtn.className = 'next';

//         // Create dot(s) indicator
//         let dotNav = document.createElement('div');
//         dotNav.className = 'container-nav-dot';

//         // for (let z = 0; z < galleryProperty['0000']['url'].length; z+=1) {
//         //     let dots = document.createElement('span');
//         //     dots.className = 'nav-dots';
//         // }
//     }

//     console.log(property['index'])
//     let target = galleryContainer[property['index']].getBoundingClientRect();

//     // let target = galleryContainer[0].getBoundingClientRect();
//     galleryContent.style.top = target.y.toString() + 'px';

//     galleryContent.appendChild(galleryImageSlider);
//     document.body.appendChild(galleryContent);

// }

// ! Test#1
// for (let y = 0; y < galleryContainer.length; y += 1) {
//     let galleryContent = document.createElement('div');
//     galleryContent.className = 'gallery__content';
//     let galleryImageSlider = document.createElement('div');
//     galleryImageSlider.className = 'gallery__image';

//     // Append images
//     // Append prev/next buttons if conditions met

//     if (galleryContainer[0]) {
//         // # Image element setup
//         // Create image element(s)
//         // Cssign source file
//         // Assign alt text
//         // Create div element with class name 'gallery__text'
//         // Create p element - 'text'
//         // Create text node assigned with figcaption
//         // Append 'textNode' to p element 'text'
//         // Append 'text' to div element 'gallery__text'
//         for (let x = 0; x < galleryProperty['0000']['url'].length; x += 1) {
//             let images = document.createElement('img');
//             images.src = galleryProperty['0000']['url'][x];
//             images.alt = galleryProperty['0000']['alt'][x];

//             // Create gallery text
//             let galleryText = document.createElement('div');
//             galleryText.className = 'gallery__text';
//             let text = document.createElement('p');
//             let textNode = document.createTextNode(galleryProperty['0000']['figcaption'][x]);

//             text.appendChild(textNode);
//             galleryText.appendChild(text);

//             galleryImageSlider.appendChild(images)
//             galleryContent.appendChild(galleryText);
//         }

//         // Determine whether to add prev/next button
//         if (galleryProperty['0000']['url'].length > 1) {
//             // Create CTA pre / next buttons
//             let prevBtn = document.createElement('a');
//             prevBtn.className = 'prev';
//             let nextBtn = document.createElement('a');
//             nextBtn.className = 'next';

//             // Create dot(s) indicator
//             let dotNav = document.createElement('div');
//             dotNav.className = 'container-nav-dot';

//             // for (let z = 0; z < galleryProperty['0000']['url'].length; z+=1) {
//             //     let dots = document.createElement('span');
//             //     dots.className = 'nav-dots';
//             // }
//         }

//         let target = galleryContainer[0].getBoundingClientRect();
//         galleryContent.style.top = target.y.toString() + 'px';

//         galleryContent.appendChild(galleryImageSlider);
//         document.body.appendChild(galleryContent);

//     }
//     // galleryImageSlider.appendChild(images);
//     // galleryContent.appendChild(galleryImageSlider);
//     // galleryContent.appendChild(galleryText);

//     // document.body.appendChild(galleryContent);

//     // let target = document.querySelector('.gallery').getBoundingClientRect();

//     // galleryContent.style.top = target.y.toString() + 'px';


//     // images.src = galleryProperty['0000']['url'][0];
//     // images.alt = galleryProperty['0000']['alt'];

//     // // create gallery text
//     // let galleryText = document.createElement('div');
//     // galleryText.className = 'gallery__text';
//     // let text = document.createElement('p');
//     // let textNode = document.createTextNode(galleryProperty['0000']['figcaption']);

//     // text.appendChild(textNode);
//     // galleryText.appendChild(text);
//     // galleryText.appendChild(text);

//     // // CTA pre / next buttons
//     // let prevBtn = document.createElement('a');
//     // let nextBtn = document.createElement('a');

//     // // Insert to DOM
//     // galleryImageSlider.appendChild(images);
//     // galleryContent.appendChild(galleryImageSlider);
//     // galleryContent.appendChild(galleryText);

//     // document.body.appendChild(galleryContent);

//     // let target = document.querySelector('.gallery').getBoundingClientRect();

//     // galleryContent.style.top = target.y.toString() + 'px';
// }



// for (let j = 0; j < galleryProperty['0000']['url'].length; i += 1) {
//     let images = document.createElement('')
// }

// ! end of experimental loop



// target via gallery['0000'][0];
// let galleryContent = document.createElement('div');
// galleryContent.className = 'gallery__content';
// let galleryImageSlider = document.createElement('div');
// galleryImageSlider.className = 'gallery__image';
// let images = document.createElement('img');
// images.src = galleryProperty['0000']['url'][0];
// images.alt = galleryProperty['0000']['alt'];

// // create gallery text
// let galleryText = document.createElement('div');
// galleryText.className = 'gallery__text';
// let text = document.createElement('p');
// let textNode = document.createTextNode(galleryProperty['0000']['figcaption']);

// text.appendChild(textNode);
// galleryText.appendChild(text);
// galleryText.appendChild(text);

// // CTA pre / next buttons
// let prevBtn = document.createElement('a');
// let nextBtn = document.createElement('a');

// // Insert to DOM
// galleryImageSlider.appendChild(images);
// galleryContent.appendChild(galleryImageSlider);
// galleryContent.appendChild(galleryText);

// document.body.appendChild(galleryContent);

// let target = document.querySelector('.gallery').getBoundingClientRect();

// galleryContent.style.top = target.y.toString() + 'px';
// you could configure this style before hand,
// so when user open their screen it will
// be adjusted so

// create space
// let TimelineContent = document.querySelector('.content');
// // ! spacing needed when CTA 'READ MORE' open
// TimelineContent.style.marginBottom = (333 + 18).toString() + 'px';


// todo
// create dots for number of gallery,
// functionality - add event listener
// e.g. image.length, create dots
// create cta prev and next, and
// add event listener
// put images manually and make
// display none first