export function returnScrollbarWidth() {
  let scrollbarWidth = window.innerWidth - document.querySelector('html').clientWidth;
  return scrollbarWidth;
}

export function isNullOrWhiteSpaces(...strings: string[]) {
  for (const str of strings) {
    if (!str || str.trim() === '') {
      return true;
    }
  }
  return false;
}