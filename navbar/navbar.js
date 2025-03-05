const arianeList = document.querySelectorAll('[data-sec]');
const arianeNav = document.querySelectorAll('.list');
const indicator = document.querySelector('.indicator');

window.addEventListener('scroll', () =>{
    const rectBody = document.body.getBoundingClientRect()
    const scrollY = window.scrollY
    const windowMid = window.innerHeight/2
    const arianeScroll = scrollY + windowMid
    let currentSec = null
    let listIndex = -1

    arianeList.forEach( item => {
        const secName = item.getAttribute('data-sec')
        const topSec = item.getBoundingClientRect().top - rectBody.top

        if (topSec < arianeScroll){
            currentSec = secName 
            listIndex++
        }
    })

    arianeNav.forEach((item) => item.classList.remove('active'));
    arianeNav[listIndex].classList.add('active');
    activeLink(arianeNav[listIndex])
});



document.addEventListener('DOMContentLoaded', () => {
    const activeItem = document.querySelector('.list.active');
    if (activeItem) {
        setTimeout(() => {
            activeLink(activeItem);
        }
        , 10);
    }
});

// Pour garder la position même si la fenêtre est redimensionnée
window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.list.active');
    if (activeItem) {
        activeLink(activeItem);
    }
});


function activeLink(activeItem) {
    // Récupère la position et la largeur de l'élément actif
    const rect = activeItem.getBoundingClientRect();
    const parent = document.getElementsByClassName('active')[0];
    const parentRect = parent.getBoundingClientRect();
    let middleIndicator = (rect.right - rect.left)/2;

    // Ajuste la position de l'indicateur en fonction du parent
    indicator.style.left = `${parentRect.right - middleIndicator}px`;

    console.log('middleIndicator: ',middleIndicator);
}