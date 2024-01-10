for (let element of document.querySelectorAll('[data-horizontal-mouse-scroll]')) {
  // Chrome, Safari, Opera
  element.addEventListener('mousewheel', scrollHorizontally)
  // Firefox
  element.addEventListener('DOMMouseScroll', scrollHorizontally)
}

function scrollHorizontally(event: any) {
  event.preventDefault()

  event.currentTarget.scrollLeft -= (
    Math.max(
      -1, Math.min(1, -event.deltaY)
      // Set the data-scroll-sensitivity attribute to indicate the scroll sensitivity.
    ) * parseInt(this.dataset.scrollSensitivity ?? 20)
  )
}

