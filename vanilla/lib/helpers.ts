/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @see https://davidwalsh.name/javascript-debounce-function
 */
export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  immediate: boolean = false
) {
  let timeout: NodeJS.Timeout | null = null
  return function () {
    // @ts-ignore
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args as any)
    }
    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args as any)
  }
}
