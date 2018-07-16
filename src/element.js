
function hide(query) {
  document.querySelector(query).setAttribute('style', 'display:none');
}

function show(query) {
  document.querySelector(query).setAttribute('style', 'display:inline-block');
}

function isExisted(query) {
  return (document.querySelector(query) !== null);
}

function addClass(query, className) {
  document.querySelector(query).classList.add(className);
}

function removeClass(query, className) {
  document.querySelector(query).classList.remove(className);
}

function toggleClass(query, className) {
  document.querySelector(query).classList.toggle(className);
}

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
