/**
 * @module instabug-websdk/xhr
 */

/**
 * @const
 * @default
 */
const DEFAULTS = {
  method: 'GET',
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
  },
  // stringifies body if the passed method is 'POST'
  stringify: true,
};

/**
 * executeXHR - execute the XHR request
 *
 * @param  {object} options request options
 */
function executeXHR(options) {
  const settings = Object.assign({}, DEFAULTS, options);

  return new Promise((resolve, reject) => {
    const xhrObj = new XMLHttpRequest();
    xhrObj.open(settings.method, settings.url);
    if (settings.headers) {
      Object.keys(settings.headers).forEach((key) => {
        xhrObj.setRequestHeader(key, settings.headers[key]);
      });
    }
    xhrObj.onload = () => {
      if (_isSuccess(xhrObj.status)) {
        resolve({
          data: xhrObj.response ? JSON.parse(xhrObj.response) : {},
          status: xhrObj.statusText,
        });
      } else {
        reject(
          new Error({
            data: xhrObj.response ? JSON.parse(xhrObj.response) : {},
            status: xhrObj.statusText,
          })
        );
      }
    };
    xhrObj.onerror = () => reject(
      new Error({
        data: xhrObj.response ? JSON.parse(xhrObj.response) : {},
        status: xhrObj.statusText,
      })
    );

    xhrObj.send(settings.method === 'POST' && settings.stringify ? JSON.stringify(settings.body) : settings.body);
  });
}


/**
 * _isSuccess - check if the response status is success or error
 *
 * @param  {number} status description
 */
function _isSuccess(status) {
  return (status >= 200 && status < 300) || status === 304;
}

module.exports = {
  xhr: executeXHR,
};
