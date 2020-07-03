export function isPromiseLike(promise) {
  return promise instanceof Promise || (promise && typeof promise.then === 'function');
}