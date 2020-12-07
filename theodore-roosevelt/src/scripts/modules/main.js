// main module

// CTA "Read More"
// For Mobile

const readMoreBtn = document.querySelectorAll('.read-more-btn');
const moreText = document.querySelectorAll('.more');
const dots = document.querySelectorAll('.dots');
const doubleArrowSymbol = document.querySelectorAll('.double-arrow-symbol');
const ContainerReadMoreBtn = document.querySelectorAll('.container-read-more-btn');

// readMoreBtn.addEventListener('click', revealContent);

// readMoreBtn.forEach(item => {item.addEventListener('click', revealContent())});

// let isOpened = true;

// function revealContent() {
//     console.log('initiate Read More')
//     if (isOpened == true) {
//         document.querySelector('.more').style.display = 'inline';
//         document.querySelector('.dots').style.display = 'none';
//         document.querySelector('.read-more-btn').textContent = 'READ LESS';
//         document.querySelector('.double-arrow-symbol').innerHTML = '<span class="double-arrow-symbol">&laquo;</span>';

//         isOpened = false;
//     } else {
//         document.querySelector('.more').style.display = 'none';
//         document.querySelector('.dots').style.display = 'inline';
//         document.querySelector('.read-more-btn').textContent = 'READ MORE';
//         document.querySelector('.double-arrow-symbol').innerHTML = '<span class="double-arrow-symbol">&raquo;</span>';

//         isOpened = true;
//     }
// }

// for (let i = 0; i < readMoreBtn.length; i+=1) {
//     readMoreBtn.addEventListener('click', function(moreText, dots, doubleArrowSymbol) {
//         let isOpened = true;

//         console.log('initiate Read More')
//         if (isOpened == true) {
//             moreText[i].style.display = 'inline';
//             document.querySelector('.dots').style.display = 'none';
//             document.querySelector('.read-more-btn').textContent = 'READ LESS';
//             document.querySelector('.double-arrow-symbol').innerHTML = '<span class="double-arrow-symbol">&laquo;</span>';

//             isOpened = false;
//         } else {
//             document.querySelector('.more').style.display = 'none';
//             document.querySelector('.dots').style.display = 'inline';
//             document.querySelector('.read-more-btn').textContent = 'READ MORE';
//             document.querySelector('.double-arrow-symbol').innerHTML = '<span class="double-arrow-symbol">&raquo;</span>';

//             isOpened = true;
//         }
//     });
//     console.log(i);
// }



let isOpened = false;
for (let i = 0; i < readMoreBtn.length; i+=1) {
    readMoreBtn[i].addEventListener('click', function moreContent() {

        console.log(i);
        if (!isOpened) {
            console.log("open" + i);
            dots[i].style.display = 'none';
            moreText[i].style.display = 'inline';
            readMoreBtn[i].innerHTML = '<span class="double-arrow-symbol">&laquo;</span> READ LESS ';
            ContainerReadMoreBtn[i].style.justifyContent = 'flex-end';

            isOpened = true;
        } else {
            console.log('close');
            dots[i].style.display = 'inline';
            moreText[i].style.display = 'none';
            readMoreBtn[i].innerHTML = 'READ MORE <span class="double-arrow-symbol">&raquo;</span>';
            ContainerReadMoreBtn[i].style.justifyContent = 'flex-start';

            isOpened = false;
        }
    })
}

// todo
// create dots for number of gallery,
// functionality - add event listener
// e.g. image.length, create dots
// create cta prev and next, and
// add event listener
// put images manually and make
// display none first