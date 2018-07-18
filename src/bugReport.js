/**
 * @module instabug-websdk/bugReport
 */

/* eslint-disable no-console */

import elem from './element';
import utils from './utils';
import logs from './logs';
import { xhr } from './xhr';

/**
 * @const
 * @type {object}
 * @description current date time object
 * @default
 */
const reportStartingTime = Date.now();


/**
 * @const
 * @type {object}
 * @description zapier and cloudinary integration data
 * @default
 */
const IntegrationData = {};


/**
 * setZapierHookUrl - set zapier webhook url
 *
 * @param  {string} webhookUrl zapier webhook url;
 */
function setZapierHookUrl(webhookUrl) {
  IntegrationData.zapierWebhookUrl = webhookUrl;
}


/**
 * getZapierHookUrl - return zapier webhook url
 *
 * @return {string} zapier webhook url
 */
function getZapierHookUrl() {
  return IntegrationData.zapierWebhookUrl;
}


/**
 * setCloudinaryIntegration - setup cloudinary integration data
 *
 * @param  {type} cloudName    cloudinary cloudname
 * @param  {type} uploadPreset cloudinary upload preset
 */
function setCloudinaryIntegration(cloudName, uploadPreset) {
  IntegrationData.cloudinaryCloudName = cloudName;
  IntegrationData.cloudinaryUploadPreset = uploadPreset;
}

/**
 * _uploadBugScreenshot - convert annotated screenshot to image, then upload it
 *
 * @return {object} XHR Promise object for the image upload request
 */
function _uploadBugScreenshot() {
  const drawingCanvas = document.getElementById('drawingCanvas');
  // incase of no screenshot to attach
  if (!drawingCanvas) return false;

  const image = drawingCanvas.toDataURL('image/png');
  const formData = new FormData();
  const blob = utils.dataURItoBlob(image);
  const cloudName = IntegrationData.cloudinaryCloudName;
  const uploadPreset = IntegrationData.cloudinaryUploadPreset;


  formData.append('metadata[file_type]', 'main-screenshot');
  formData.append('file', blob, 'image.png');
  formData.append('upload_preset', uploadPreset);
  formData.append('tags', 'instabug_screenshot');

  return xhr({
    method: 'POST',
    url: `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    stringify: false,
  });
}


/**
 * getMemoryUsed - get current memory used by browser
 *
 * @return {object | bool}  return used and total memory, if api is not supported return false
 */
function getMemoryUsed() {
  let output;
  if (window.performance.memory) {
    const memory = window.performance.memory;
    output = {
      used: memory.usedJSHeapSize / 1000000,
      total: memory.jsHeapSizeLimit / 1000000,
    };
  } else {
    console.warn('We can\'t collect the memory information from your browser');
    output = false;
  }
  return output;
}


/**
 * getBrowserData - get browser information that we used in the report
 *
 * @return {object}  borwser information - browser name, os, navigatorInfo and locale
 */
function getBrowserData() {
  const nVer = navigator.appVersion;
  const currentBrowserData = {};
  let browserName = navigator.appName;

  // browserName = nVer.match(/(firefox|msie|chrome|safari)[/\s]([\d.]+)/ig)[0];
  if (nVer.match(/(firefox|msie|chrome|safari)[/\s]([\d.]+)/ig)) {
    browserName = nVer.match(/(firefox|msie|chrome|safari)[/\s]([\d.]+)/ig)[0];
  } else {
    browserName = 'Unknown';
  }
  let OSName = 'Unknown OS';
  if (nVer.indexOf('Win') !== -1) OSName = 'Windows';
  if (nVer.indexOf('Mac') !== -1) OSName = 'MacOS';
  if (nVer.indexOf('X11') !== -1) OSName = 'UNIX';
  if (nVer.indexOf('Linux') !== -1) OSName = 'Linux';

  currentBrowserData.browserName = browserName;
  currentBrowserData.Os = OSName;
  currentBrowserData.navigatorInfo = navigator;
  currentBrowserData.locale = navigator.language;

  return currentBrowserData;
}

/**
 * prepareBugReport - prepare and return the bug report object
 *
 * @return {object} complete bug report object
 */
function prepareBugReport() {
  const form = document.getElementById('instabugForm');

  let report = {};
  report = {
    reported_at: Date.now(),
    email: form.email.value,
    title: form.comment.value,
    device: getBrowserData().browserName,
    os: getBrowserData().Os,
    current_view: location.href,
    duration: utils.shortifyTime(Date.now() - reportStartingTime),
    locale: getBrowserData().locale,
    screen_size: `${window.innerWidth}x${window.innerHeight}`,
    density: window.devicePixelRatio,
    localStorage: JSON.stringify(localStorage),
    console_log: JSON.stringify(logs.getConsoleLog()),
  };

  if (getMemoryUsed()) {
    report.memory = getMemoryUsed();
  }

  return report;
}

function _prepareBugReportRequest(bugReportDetails, webHookURL) {
  return xhr({
    method: 'POST',
    url: webHookURL,
    body: bugReportDetails,
    stringify: true,
  });
}

function submitBugReport() {
  const bugReport = prepareBugReport();
  const uploadScreenshotRequest = _uploadBugScreenshot();
  const zapierWebhookUrl = IntegrationData.zapierWebhookUrl;

  elem.hide('#instabugFormContainer');
  elem.show('#instabugLoading');

  // if no screenshot attached with the report, submit it direct, but if you found a screenshot
  // upload it first, include its url the submit the report
  if (!uploadScreenshotRequest) {
    _prepareBugReportRequest(bugReport, zapierWebhookUrl)
      .finally(() => {
        elem.hide('#instabugLoading');
        elem.show('#instabugThankYouPage');
      });
  } else {
    uploadScreenshotRequest.then((response) => {
      if (response.status === 'OK' && response.data && response.data.secure_url) {
        bugReport.screenshot = response.data.secure_url;
      }
    }).finally(() => {
      _prepareBugReportRequest(bugReport, zapierWebhookUrl)
        .finally(() => {
          elem.hide('#instabugLoading');
          elem.show('#instabugThankYouPage');
        });
    });
  }
}

module.exports = {
  setZapierHookUrl,
  setCloudinaryIntegration,
  submitBugReport,
  getBrowserData,
  getZapierHookUrl,
};
