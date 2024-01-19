import ActionOnView, { ObserverTools } from './observerTools.src.js'

new ObserverTools({ repeatObserve: true, })

new ActionOnView({
  selectors: '.element_or_elements_group',
})