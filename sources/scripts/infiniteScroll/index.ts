const scrollerInners = document.querySelectorAll('infinite-scroll c-inner')

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (let inner of scrollerInners) {
    for (let element of Array.from(inner.children)) {
      let clonedElement = element.cloneNode(true) as HTMLElement
      clonedElement.setAttribute('aria-hidden', 'true')

      inner.appendChild(clonedElement)
    }
  }
}