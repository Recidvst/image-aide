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

  // trim
  if (params.has('trim')) {
    let trimVal = params.get('trim');
    // strip any non numeric characters in case the param is passed as e.g. "'100'"
    trimVal = Number(trimVal.replace(/\D/g,''));
    if (Number.isInteger(trimVal)) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.trim(trimVal))});
    }
  }

  // rotate
  if (params.has('rotate')) {
    let rotateVal = params.get('rotate');
    // strip any non numeric characters in case the param is passed as e.g. "'100'"
    rotateVal = Number(rotateVal.replace(/\D/g,''));
    // get the background colour if passed (to fill the angles left if not 90deg/180deg)
    let rotateBgColour = '#000000';
    if (params.has('rotateBackground')) {
      let rotateBgVal = params.get('rotateBackground');
      rotateBgVal = rotateBgVal.replace(/"|'/g, "");
      if (typeof rotateBgVal === 'string' && rotateBgVal.indexOf('rgb') === 0) {
        rotateBgColour = rotateBgVal;
      }
    }
    if (Number.isInteger(rotateVal) && rotateBgColour) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.rotate(rotateVal, {
        'background': rotateBgColour 
      }))});
    }
  }

  // flip
  if (params.has('flip')) {
    let flipVal = params.get('flip');
    if ( flipVal !== 'false' && !(typeof flipVal === 'boolean' && !flipVal)) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.flip(flipVal))});
    }
  }  

  // flop
  if (params.has('flop')) {
    let flopVal = params.get('flop');
    if ( flopVal !== 'false' && !(typeof flopVal === 'boolean' && !flopVal)) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.flop(flopVal))});
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