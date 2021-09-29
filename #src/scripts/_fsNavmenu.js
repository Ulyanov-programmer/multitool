function showOrHideFullscreenNav(e) {
    const fsNavmenu = doc.querySelector('.fullscreen-navmenu');
    let sbWidth = innerWindowWidth() - doc.querySelector('html').clientWidth;
    let header = doc.querySelector('header');

    if (fsNavmenu !== undefined) {
        burger.classList.toggle('active');
        
        body.classList.toggle('fixed');
        body.style.paddingRight = sbWidth + 'px';

        header.classList.toggle('fixed-header');
        header.style.paddingRight = sbWidth + 'px';

        fsNavmenu.classList.toggle('active');
        fsMenuIsActive = !fsMenuIsActive;
    }
}
const burger = doc.getElementById('burgerButton');
burger.addEventListener('click', showOrHideFullscreenNav);

let fsMenuIsActive = false;