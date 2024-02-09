/**
 * @returns Returns the width of the page scroll bar.
 */
export function returnScrollbarWidth(): number {
  let scrollbarWidth = window.innerWidth - document.querySelector('html').clientWidth
  return scrollbarWidth
}
/**
 * @returns 
 * If at least one of the input strings is null or contain only white spaces, 
 * returns true. Otherwise - false.
 * 
 * @param strings
 * Strings to be checked.
 */
export function isNullOrWhiteSpaces(...strings: string[]): boolean {
  for (const str of strings) {
    if (!str || str.trim() === '') {
      return true
    }
  }
  return false
}
/**
 * Temporarily stops code execution for the specified amount of time.
 * @param timeMs Awaiting time in ms.
 * @returns New `Promise`. Pay no attention to it.
 */
export function sleep(timeMs: number): Promise<any> {
  return new Promise(r => setTimeout(r, timeMs))
}
export function elementsIsExist(...selectors: string[]): boolean {
  for (let selector of selectors) {
    if (document.querySelector(selector) == null) {
      return false
    }
  }
  return true
}
export function elementIsExistWithLog(nameOfErrorRoot: string, ...selectors: string[]): boolean {
  for (let selector of selectors) {
    if (document.querySelector(selector) == null) {
      console.log(`[${nameOfErrorRoot}] Element ${selector} was not found!`)
      return false
    }
  }
  return true
}