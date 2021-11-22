function appendModalMenu(e) {
  let targetContentPreview = e.currentTarget;
  let modalElementClone = modalElement.cloneNode(true);

  modalElementClone.classList.remove('_non-active');

  targetContentPreview.append(modalElementClone);
  setTimeout(() => {
    modalElementClone.classList.add('_active');
  }, 30)
}
function removeModalMenu(e) {
  // Try to get modal block.
  let modalMenu = e.currentTarget.lastElementChild;

  if (modalMenu.classList.contains("class")) {
    modalMenu.classList.remove("_active")
    setTimeout(() => {
      modalMenu.remove();
    }, 200)
  }
}
const contentElements = document.querySelectorAll('.container-class');
const modalElement = document.querySelector('.modal');