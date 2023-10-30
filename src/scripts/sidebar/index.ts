import Sidebar from './sidebar.src.js'
import { ChangePlane } from '../swipe/swipe.src.js'
/*
  The buttons that open a particular sidebar should contain [data-toggle-sidebar-id='sidebarId']
*/

new Sidebar({
  idOfSidebar: 'sidebar1',
  buttonActiveClass: 'active',
  sidebarActiveClass: 'active',

  // swipe fields should contain [data-swipe-element='selectorOfSidebar']
  // swipeElementOptions: {
  //   changePlane: ChangePlane.ToRight,
  //   swipeSensitivity: 0.5,
  //   maxWorkWidth: 1440,
  // }
})