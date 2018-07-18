/**
 * @module instabug-websdk/extension
 */

import element from './element';
import annotation from './annotations';

/**
 * isInstalled - check if the web browser extension is installed or not
 *
 * @return {bool}
 */
function isInstalled() {
  return (document.getElementById('instabugSDK').getAttribute('plugin'));
}


/**
 * takeScreenShot - dispath the `takeScreenShot` event - this event logic is already defined in
 * instabug webbrowser extension
 */
function takeScreenShot() {
  const event = document.createEvent('Event');
  event.initEvent('takeScreenShot', true, true);
  document.dispatchEvent(event);
}


document.addEventListener('screenShotCreated', () => {
  annotation.init();
  annotation.renderScreenshot(document.getElementById('instabugImage').value);
  element.addClass('body', 'u-disable-scrolling');
  document.getElementById('instabugImage').remove();
});

module.exports = {
  isInstalled,
  takeScreenShot,
};
