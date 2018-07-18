/**
 * @module instabug-websdk/annotations
 */

import elem from './element';

const drawingHistory = [];


/**
 * @const
 * @type {number}
 * @default
 */
const defaultDrawingOptions = {
  size: 3,
  color: '#df4b26',
};

let drawingSettings;

/**
 * init - initialize the annotation functionality
 *
 * @param  {object} options set the drawing annotation options {size, color}
 */

function init(options) {
  const drawingCanvas = document.createElement('canvas');
  const ctx = drawingCanvas.getContext('2d');

  let canvasContainer = document.createElement('div');
  let itemPoints;
  let paint;

  updateSettings(options);

  drawingCanvas.setAttribute('width', window.innerWidth);
  drawingCanvas.setAttribute('height', window.innerHeight);
  drawingCanvas.setAttribute('id', 'drawingCanvas');

  canvasContainer.setAttribute('id', 'ibgDrawingContainer');
  canvasContainer.setAttribute('class', 'ibgsdk-element drawing-canvas-container');

  canvasContainer.appendChild(drawingCanvas);
  document.body.appendChild(canvasContainer);

  // for IE support
  if (typeof window.G_vmlCanvasManager !== 'undefined') {
    canvasContainer = window.G_vmlCanvasManager.initElement(drawingCanvas);
  }

  drawingCanvas.onmousedown = (e) => {
    // init drawing process
    paint = true;
    itemPoints = [];
    itemPoints.push(
      _getCursorPosition(e),
    );
  };

  drawingCanvas.onmousemove = (e) => {
    if (paint) {
      const fromPoint = itemPoints.slice(-1)[0];
      const toPoint = [e.clientX, e.clientY];

      itemPoints.push(
        _getCursorPosition(e),
      );
      _drawLine(ctx, fromPoint, toPoint, drawingSettings);
    }
  };

  drawingCanvas.onmouseup = () => {
    paint = false;
    drawingHistory.push({
      type: 'pencil',
      points: itemPoints,
    });
    itemPoints = null;
  };
}


/**
 * renderScreenshot - render the screenshot image into canvas
 *
 * @param  {string} image base64 encoded screenshot image that we will annotate over.
 */
function renderScreenshot(image) {
  const drawingCanvas = document.getElementById('drawingCanvas');
  const context = drawingCanvas.getContext('2d');
  const screenshot = document.createElement('img');

  screenshot.setAttribute('src', image);
  screenshot.onload = () => {
    context.drawImage(screenshot, 0, 0, window.innerWidth, window.innerHeight);
  };

  elem.show('#instabugFormContainer');
}


/**
 * updateSettings - update drawing options object
 *
 * @param  {object} options drawing options object {size, color}
 */
function updateSettings(options) {
  drawingSettings = Object.assign({}, defaultDrawingOptions, options);
}


/**
 * resetSettings - reset drawing options to default vaules
 */
function resetSettings() {
  drawingSettings = defaultDrawingOptions;
}


/**
 * _getCursorPosition - get cursor current position
 * @private
 *
 * @param  {object} e event object
 * @return {array}   cursor x and y position
 */
function _getCursorPosition(e) {
  return [e.clientX, e.clientY];
}


/**
 * _drawLine - draw a line
 *  @private
 * @param  {type} canvasContext canvas context object
 * @param  {type} from          line start point
 * @param  {type} to            line end point
 * @param  {type} options       drawing options object {size}
 */
function _drawLine(canvasContext, from, to, options) {
  const ctx = canvasContext;

  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.lineWidth = options.size;
  ctx.strokeStyle = options.color;
  ctx.globalCompositeOperation = 'source-over';
  ctx.moveTo(from[0], from[1]);
  ctx.lineTo(to[0], to[1]);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

module.exports = {
  init,
  renderScreenshot,
  updateSettings,
  resetSettings,
};
