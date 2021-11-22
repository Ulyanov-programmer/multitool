export function showOrHideFullscreenNav(e) {
  const fsNavmenu = document.querySelector('.fullscreen-navmenu');
  let sbWidth = window.innerWidth - document.querySelector('html').clientWidth;
  let header = document.querySelector('header');

  if (fsNavmenu !== undefined) {
    burger.classList.toggle('active');

    document.body.classList.toggle('scroll-block');
    document.body.style.paddingRight = sbWidth + 'px';

    header.classList.toggle('fixed-header');
    header.style.paddingRight = sbWidth + 'px';

    fsNavmenu.classList.toggle('active');
    fsMenuIsActive = !fsMenuIsActive;
  }
}
const burger = document.getElementById('burgerButton');
burger.addEventListener('click', showOrHideFullscreenNav);
