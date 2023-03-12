import Sidebar from './modules/sidebar.src.js'
import { ChangePlane } from './modules/swipe.src.js'
/*
  The buttons that open a particular sidebar should contain [data-toggle-sidebar='sidebarId']
*/

new Sidebar({
  idOfSidebar: 'sidebar1',
  buttonActiveClass: 'active',
  sidebarActiveClass: 'active',

  // swipeElementOptions: {
  //   // swipe fields should contain [data-swipe-element='selectorOfSidebar']
  //   changePlane: ChangePlane.ToRight,
  //   swipeSensitivity: 0.5,
  //   maxWorkWidth: 1440,
  // }
})