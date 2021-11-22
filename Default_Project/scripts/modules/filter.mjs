export function filtContentByType(e) {
  let typeOfContent = e.target.dataset.filtContent;

  for (const work of works) {
    if (typeOfContent === 'all' || work.dataset.contentType === typeOfContent) {
      work.style.display = '';
    } else {
      work.style.display = 'none';
    }
  }
}
const filterButtons = document.querySelectorAll('[data-filt-content]');
for (const filtButton of filterButtons) {
  filtButton.addEventListener('click', filtContentByType);
}
const works = document.querySelectorAll('[data-content-type]');

/*
? For working add data-attributes data-filt-content="type" for filter buttons,
? And data-content-type="type" for content-blocks.
*/