// build Sharp.js image processing command
const sharp = require('sharp');

function buildSharpLogic(params) {
  let logicArr = [];

  // greyscale
  if (params.has('greyscale')) {
    let greyscaleVal = params.get('greyscale');
    if ( typeof greyscaleVal === 'boolean' || greyscaleVal === 'true') {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.greyscale(greyscaleVal))});      
    }
  }

  // tint
  if (params.has('tint')) {
    let tintVal = params.get('tint');
    tintVal = tintVal.replace(/"|'/g, "");
    if (typeof tintVal === 'string' && tintVal.indexOf('rgb') === 0) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.tint(tintVal))});
    }
  }

  // blur
  if (params.has('blur')) {
    let blurVal = params.get('blur');
    // strip any non numeric characters in case the param is passed as e.g. "'100'"
    blurVal = blurVal.replace(/\D/g,'');
    blurVal = parseFloat(blurVal);
    // must be a number between 0.3 and 1000 
    if (blurVal >= 0.3 && blurVal <= 1000) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.blur(blurVal))});
    }
  }

  if (logicArr && logicArr.length > 0) {
    // if process logic found then add necessary bookend sharp functions
    logicArr.unshift(function (imageToProcess) {return Promise.resolve(sharp(imageToProcess))});
    logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.toBuffer())});
    return logicArr;
  }

  return false;
}

module.exports = buildSharpLogic;