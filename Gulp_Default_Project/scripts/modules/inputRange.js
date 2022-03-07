/*
! CODE FOR WORK IN HTML VIA INPUT-RANGE ELEMENT
! IT HAS NOT BEEN TESTED IN PRACTICE

function changeByWheel(inputEvent) {
    let elementsWasResized = elements[0].style.width !== "";
  
    if (inputEvent.deltaY < 100 && inputEvent.deltaY > 0 ||
        inputEvent.deltaY > -100 && inputEvent.deltaY < 0) {
        scrollFactor = -0.1;
    }
    // Takes resize (scroll) value and rounding to the integer.
    // You can change the step by changing the value scrollFactor.

    let changeSize = inputEvent.deltaY * scrollFactor;

    let oldContentWidth = defValue;
    if (elementsWasResized) {
        oldContentWidth = parseInt(elements[0].style.width.replace("px", ""));
    }

    let newContentWidth;
    if (changeSize >= 0) {
        newContentWidth = oldContentWidth + changeSize;
    } else {
        newContentWidth = oldContentWidth - Math.abs(changeSize);
    }

    // Does not allow you to change the size
    // if it is below the permissible values of min and max in the range input.
    if (newContentWidth <= defValue + 102 && newContentWidth >= defValue - 102) {
        elements.forEach(element => {
            element.style.width = newContentWidth + "px";
        });
        // Changes the position of the point.
        if (changeSize <= 0) {
            inputEvent.target.value = parseInt(inputEvent.target.value) - Math.abs(changeSize);
        } else {
            inputEvent.target.value = parseInt(inputEvent.target.value) + changeSize;
        }
    }
}

function changeByClick(inputEvent) {
    let changeSize = parseInt(inputEvent.currentTarget.value);
    let newContentWidth: number;

    if (changeSize >= 0) {
        newContentWidth = defValue + changeSize;
    } else {
        changeSize = Math.abs(changeSize)
        newContentWidth = defValue - changeSize;
    }

    elements.forEach(element => {
        element.style.width = newContentWidth + "px";
    });
}

let scrollFactor = -0.01;
const defValue: number = 0
const elements = document.querySelectorAll<HTMLElement>('yourElements')
const rangeInput = document.querySelector('#inputRange')


rangeInput.addEventListener('input', changeByClick);
rangeInput.addEventListener('wheel', (arg) => {
    changeByWheel(arg);
    return false;
});
// document.addEventListener('contextmenu', function (event) {
//   event.preventDefault();
//   event.button
// }, true);

*/ 
