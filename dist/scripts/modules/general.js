export function returnScrollbarWidth() {
  let scrollbarWidth = window.innerWidth - document.querySelector("html").clientWidth;
  return scrollbarWidth;
}
export function isNullOrWhiteSpaces(...strings) {
  for (const str of strings) {
    if (!str || str.trim() === "") {
      return true;
    }
  }
  return false;
}
export function sleep(timeMs) {
  return new Promise((r) => setTimeout(r, timeMs));
}
export function elementsIsExist(...selectors) {
  for (let selector of selectors) {
    if (document.querySelector(selector) == null) {
      return false;
    }
  }
  return true;
}
export function elementIsExistWithLog(nameOfErrorRoot, ...selectors) {
  for (let selector of selectors) {
    if (document.querySelector(selector) == null) {
      console.log(`[${nameOfErrorRoot}] Some element is not exist.`);
      return false;
    }
  }
  return true;
}
