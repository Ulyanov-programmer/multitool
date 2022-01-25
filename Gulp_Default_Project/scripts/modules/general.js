/**
 * @returns Returns the width of the page scroll bar.
 */
export function returnScrollbarWidth() {
    let scrollbarWidth = window.innerWidth - document.querySelector('html').clientWidth;
    return scrollbarWidth;
}
/**
 * @returns
 * If at least one of the input strings is null or contain only white spaces,
 * returns true. Otherwise - false.
 *
 * @param strings
 * Strings to be checked.
 */
export function isNullOrWhiteSpaces(...strings) {
    for (const str of strings) {
        if (!str || str.trim() === '') {
            return true;
        }
    }
    return false;
}
export function sleep(timeMs) {
    return new Promise(r => setTimeout(r, timeMs));
}
