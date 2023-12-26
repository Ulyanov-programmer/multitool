for (let element of document.querySelectorAll('.horizontal-scroll')) {
  // Chrome, Safari, Opera
  element.addEventListener('mousewheel', scrollHorizontally)
  // Firefox
  element.addEventListener('DOMMouseScroll', scrollHorizontally)
}

function scrollHorizontally(event: any) {
  event.preventDefault()

  let delta = Math.max(-1, Math.min(1, (-event.deltaY || -event.detail)))

  event.currentTarget.scrollLeft -= (delta * 15)
}

