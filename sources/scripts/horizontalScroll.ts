let elementsWithHorizontalScroll = document.querySelectorAll('.horizontal-scroll')

function scrollHorizontally(e) {
  let delta = Math.max(-1, Math.min(1, (-e.deltaY || -e.detail)))

  e.currentTarget.scrollLeft -= (delta * 15)

  e.preventDefault()
}

for (let element of elementsWithHorizontalScroll) {
  // Chrome, Safari, Opera
  element.addEventListener('mousewheel', scrollHorizontally)
  // Firefox
  element.addEventListener('DOMMouseScroll', scrollHorizontally)
}
