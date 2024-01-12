class HTMLInfiniteScroll extends HTMLElement {
  public innerContainer: HTMLElement

  constructor() {
    super()
  }

  connectedCallback() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.addEventListener('DOMContentLoaded', this.init.bind(this))
  }

  init() {
    this.innerContainer = this.querySelector('c-inner')

    this.innerContainer.insertAdjacentHTML(
      'beforeend', this.innerContainer.innerHTML
    )
  }
}

customElements.define('infinite-scroll', HTMLInfiniteScroll)
