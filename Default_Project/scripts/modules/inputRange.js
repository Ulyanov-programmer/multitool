// function changeByWheel(inputEvent) {
//   let elementsWasResized = albumElements[0].style.width !== "";
//   let scrollFactor = -0.01;
//   if (inputEvent.deltaY < 100 && inputEvent.deltaY > 0 ||
//     inputEvent.deltaY > -100 && inputEvent.deltaY < 0) {
//     scrollFactor = -0.1;
//   }
//   // Takes resize (scroll) value and rounding to the integer.
//   // You can change the step by changing the value scrollFactor.
//   let changeSize = parseInt(inputEvent.deltaY * scrollFactor);
//   let oldContentWidth = albumContentWidth;
//   if (elementsWasResized) {
//     oldContentWidth = parseInt(albumElements[0].style.width.replace("px", ""));
//   }
//   let newContentWidth;
//   if (changeSize >= 0) {
//     newContentWidth = oldContentWidth + changeSize;
//   } else {
//     newContentWidth = oldContentWidth - Math.abs(changeSize);
//   }
//   // Does not allow you to change the size 
//   // if it is below the permissible values of min and max in the range input.
//   if (newContentWidth <= albumContentWidth + 102 && newContentWidth >= albumContentWidth - 102) {
//     albumElements.forEach(element => {
//       element.style.width = newContentWidth + "px";
//     });
//     // Changes the position of the slider.
//     if (changeSize <= 0) {
//       inputEvent.target.value = parseInt(inputEvent.target.value) - Math.abs(changeSize);
//     } else {
//       inputEvent.target.value = parseInt(inputEvent.target.value) + changeSize;
//     }
//   }
// }
// function changeByClick(inputEvent) {
//   let changeSize = parseInt(inputEvent.currentTarget.value);
//   let newContentWidth;
//   if (changeSize >= 0) {
//     newContentWidth = albumContentWidth + changeSize;
//   } else {
//     changeSize = Math.abs(changeSize)
//     newContentWidth = albumContentWidth - changeSize;
//   }
//   albumElements.forEach(element => {
//     element.style.width = newContentWidth + "px";
//   });
// }
// const albumElements = document.querySelectorAll('.album-element');
// const rangeInput = document.querySelector('#inputRange');
// rangeInput.addEventListener('input', changeByClick);
// rangeInput.onwheel = (arg) => {
//   changeByWheel(arg);
//   return false;
// }
// rangeInput.oncontextmenu = (event) => {
//   if (event.which == 3) {
//     rangeInput.value = 0;
//   }
//   return false;
// }
