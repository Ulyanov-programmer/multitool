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
    this.insertAdjacentHTML(
      'beforeend', this.innerHTML
    )

    this.initShadowRoot()
  }
  private initShadowRoot() {
    this.attachShadow({ mode: 'open' })
      .innerHTML = `
<style>
@keyframes infinite-scrolling {
  to { translate: calc(-50% - var(--gap) / 2) 0 0; }
}
:host {
  --direction: normal;
  --duration: 5s;
  --gap: 15px;
  display: grid !important;
  place-items: center left !important;
  contain: paint !important;
}
c-inner {
  display: flex !important;
  flex-flow: row nowrap !important;
  align-items: center;
  gap: var(--gap) !important;
  width: max-content !important;
  animation: infinite-scrolling 
    var(--duration) 
    linear 
    infinite 
    var(--direction)
    !important;
  }
}

</style>
<c-inner>
  <slot></slot>
</c-inner>
  `
  }
}

customElements.define('infinite-scroll', HTMLInfiniteScroll)
