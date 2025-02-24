const card = document.querySelectorAll('.card');

card.forEach( el => {
    el.addEventListener('mousemove', (e) => {
        let elRect = el.getBoundingClientRect();

        let x = e.clientX - elRect.x;
        let y = e.clientY - elRect.y;

        let midcardwidth = elRect.width / 2;
        let midcardheight = elRect.height / 2;

        let angleY = (x-midcardwidth) / 6;
        let angleX  = (y-midcardheight ) / 6;

        let glowX = x / elRect.width * 100;
        let glowY = y / elRect.height * 100;

        el.children[0].style.transform = `rotateX(${- angleX}deg) rotateY(${angleY}deg)`;
        el.children[1].style.transform = `rotateX(${- angleX}deg) rotateY(${angleY}deg)`;
        el.children[1].style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgb(205, 199, 176), transparent)`;

    });

    el.addEventListener('mouseleave', () => {
        el.children[0].style.transform = `rotateX(0deg) rotateY(0deg)`;
        el.children[1].style.transform = `rotateX(0deg) rotateY(0deg)`;
        el.children[1].style.background = `none`;

    }
    );
});