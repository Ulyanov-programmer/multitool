const pageTitle = document.title
const links = Array.from(document.querySelectorAll('#main-navigation a'))

let linkThatShouldBeActive = links.find(link => {
  let refText = link.textContent.replaceAll(' ', '').replaceAll('\n', '')
  return refText == pageTitle
})

linkThatShouldBeActive.classList.add('active')