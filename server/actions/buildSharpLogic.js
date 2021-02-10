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
    let tintVal = params.get('tint').replace(/"|'/g, "");
    if (typeof tintVal === 'string' && tintVal.indexOf('rgb') === 0) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.tint(tintVal))});
    }
  }

  // blur
  if (params.has('blur')) {
    let blurVal = params.get('blur').replace(/\D/g,'');
    // strip any non numeric characters in case the param is passed as e.g. "'100'"
    blurVal = parseFloat(blurVal);
    // must be a number between 0.3 and 1000 
    if (blurVal >= 0.3 && blurVal <= 1000) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.blur(blurVal))});
    }
  }

  // trim
  if (params.has('trim')) {
    let trimVal = params.get('trim').replace(/\D/g,'');
    // strip any non numeric characters in case the param is passed as e.g. "'100'"
    trimVal = Number(trimVal);
    if (Number.isInteger(trimVal)) {
      logicArr.push(function (imageToProcess) {return Promise.resolve(imageToProcess.trim(trimVal))});
    }
  }

  // rotate
  if (params.has('rotate')) {
    let rotateVal = params.get('rotate').replace(/\D/g,'');
    // strip any non numeric characters in case the param is passed as e.g. "'100'"
    rotateVal = Number(rotateVal);
    // get the background colour if passed (to fill the angles left if not 90deg/180deg)
    let rotateBgColour = '#000000';
    if (params.has('rotateBackground')) {
      let rotateBgVal = params.get('rotateBackground').replace(/"|'/g, "");
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

  // resize
  if (params.has('width') || params.has('height') || params.has('scaleWidth') || params.has('scaleHeight') ) {
    // handle width
    let newWidth = null;
    if (params.has('width')) {
      newWidth = Number(params.get('width').replace(/"|'/g, ""));
    }
    // handle height
    let newHeight = null;
    if (params.has('height')) {
      newHeight = Number(params.get('height').replace(/"|'/g, ""));
    }
    // handle scale
    let scaleWidth = null;
    if (params.has('scaleWidth')) {
      let scaleWidthVal = parseFloat(params.get('scaleWidth').replace(/"|'/g, ""));
      if (scaleWidthVal && scaleWidthVal > 0 && scaleWidthVal <= 1) {
        scaleWidth = scaleWidthVal;
      }
    }
    let scaleHeight = null;
    if (params.has('scaleHeight')) {
      let scaleHeightVal = parseFloat(params.get('scaleHeight').replace(/"|'/g, ""));
      if (scaleHeightVal && scaleHeightVal > 0 && scaleHeightVal <= 1) {
        scaleHeight = scaleHeightVal;
      }
    }
    // ------------------------------- //
    // handle fit
    let fit = 'cover';
    if (params.has('fit')) {
      let fitVal = params.get('fit').replace(/"|'/g, "");
      if (typeof fitVal === 'string') {
        fit = fitVal;
      }
    }
    // handle position
    let position = 'centre';
    if (params.has('position')) {
      let positionVal = params.get('position').replace(/"|'/g, "");
      if (typeof positionVal === 'string') {
        position = positionVal;
      }
    }
    // handle gravity (overrides position)
    if ((fit === 'cover' || fit === 'contain') && params.has('gravity')) {
      let gravityVal = params.get('gravity').replace(/"|'/g, "");
      if (typeof gravityVal === 'string') {
        position = gravityVal;
      }
    }
    // handle strategy (overrides position & gravity)
    if (fit === 'cover' && params.has('strategy')) {
      let strategyVal = params.get('strategy').replace(/"|'/g, "");
      if (typeof strategyVal === 'string' && (strategyVal === 'entropy' || strategyVal === 'attention')) {
        position = strategyVal;
      }
    }
    // handle background
    let background = '#000000';
    if (params.has('resizeBackground')) {
      let backgroundVal = params.get('resizeBackground').replace(/"|'/g, "");
      if (typeof backgroundVal === 'string' && backgroundVal.indexOf('rgb') === 0) {
        background = backgroundVal;
      }
    }
    // handle kernel
    let kernel = 'lanczos3';
    if (params.has('kernel')) {
      let kernelVal = params.get('kernel').replace(/"|'/g, "");      
      if (typeof kernelVal === 'string') {
        kernel = kernelVal;
      }
    }
    // handle withoutEnlargement
    let withoutEnlargement = false;
    if (params.has('withoutEnlargement')) {
      let enlargementVal = params.get('withoutEnlargement').replace(/"|'/g, "");      
      if ( typeof enlargementVal === 'boolean' || enlargementVal === 'true') {
        withoutEnlargement = true;
      }
    }
    // handle fastShrinkOnLoad
    let fastShrinkOnLoad = true;
    if (params.has('fastShrinkOnLoad')) {
      let fsolVal = params.get('fastShrinkOnLoad').replace(/"|'/g, "");      
      if ( typeof fsolVal === 'boolean' || fsolVal === 'true') {
        fastShrinkOnLoad = true;
      }
    }

    // apply all
    logicArr.push(async function(imageToProcess) {
      const metadata = await imageToProcess.metadata();
      return Promise.resolve(imageToProcess.resize({
        'width': scaleWidth ? Math.round(metadata.width * scaleWidth) : newWidth,
        'height': scaleHeight ? Math.round(metadata.height * scaleHeight) : newHeight,
        fit,
        position,
        background,
        kernel,
        withoutEnlargement,
        fastShrinkOnLoad 
      }))
    });
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