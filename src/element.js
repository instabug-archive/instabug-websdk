/**
 * @module instabug-websdk/elemts
 */


/**
 * hide - hide the queriable elemt passed to the function
 *
 * @param  {string} query html element query selector
 */
function hide(query) {
  document.querySelector(query).setAttribute('style', 'display:none');
}

/**
 * show - shows the queriable elemt passed to the function
 *
 * @param  {string} query html element query selector
 */
function show(query) {
  document.querySelector(query).setAttribute('style', 'display:inline-block');
}


/**
 * isExisted - checks if the query selector passed is existed in the current DOM
 *
 * @param  {string} query html element query selector
 */
function isExisted(query) {
  return (document.querySelector(query) !== null);
}


/**
 * addClass - add the passed class name to the passed quey selector
 *
 * @param  {string} query     html element query selector
 * @param  {string} className one or more class separated by spaces
 */
function addClass(query, className) {
  document.querySelector(query).classList.add(className);
}

/**
 * removeClass - removed the passed class name to the passed quey selector if existed
 *
 * @param  {string} query     html element query selector
 * @param  {string} className one or more class separated by spaces
 */
function removeClass(query, className) {
  document.querySelector(query).classList.remove(className);
}

/**
 * toggleClass - toggle the classes passed to the classnmae param
 *
 * @param  {type} query     html element query selector
 * @param  {type} className one or more class separated by spaces
 */
function toggleClass(query, className) {
  document.querySelector(query).classList.toggle(className);
}

/**
 * remove - dlete the query selector element from the DOm
 *
 * @param  {type} query html element query selector
 */
function remove(query) {
  document.querySelector(query).remove();
}

module.exports = {
  hide,
  show,
  isExisted,
  addClass,
  removeClass,
  toggleClass,
  remove,
};
