const express = require('express');
const router = express.Router({mergeParams: true});
const fetch = require('node-fetch');
const url = require('url');
const buildSharpLogic = require('../actions/buildSharpLogic');

// encryption
const authFuncs = require('./auth');
const verifyToken = authFuncs.expressVerifyToken;

// TODO: use verifyToken to control access

// error handling fn
const errorHandler = (req, res, errorMessage = 'Failed to fetch the image URL') => {
  return res.status(400).send({
    'error': errorMessage,
    'originalURL': req.body.url,
    'buffer': null
  });
}

// HANDLE IMAGE PROCESS REQUEST
router.get('/request', (req, res) => {
  return res.status(200).send('Submit image processing requests here');
});

router.post('/request', async (req, res) => {
  res.set('Content-Type', 'application/json');
  let errorMessage = null;

  if (req.body.url) {
    const requestURL = new URL(req.body.url);
    const requestParams = requestURL.searchParams;

    const response = await fetch(requestURL).catch( e => null);

    // on error
    if (!response || (response && !response.ok) || (response && !requestParams)) { 
      return errorHandler(req, res, errorMessage);
    }
    // TODO: add tests to confirm that the response was an image and not e.g. json or text

    // get as type ArrayBuffer (Node)
    const buffer = await response.buffer();

    // image to be returned to the client (default to buffer and replace with processed)
    let imageToProcess = buffer;

    // create a UID by reading the middle 6 bytes of the buffer as a string 12 chars long
    let bufferUID = imageToProcess.slice( (imageToProcess.length / 2), (imageToProcess.length / 2) + 10).readUIntBE(0, 6).toString(16);

    // build command to pass to sharp
    const sharpLogicArr = buildSharpLogic(requestParams);
    
    // if no command found, then just return the unprocessed image
    if (imageToProcess && !sharpLogicArr) {
      return res.status(200).send({
        'error': null,
        'originalURL': req.body.url,
        'buffer': imageToProcess,
        'bufferUID': bufferUID
      });
    }
    // otherwise, handle the processing
    else if (imageToProcess && sharpLogicArr && sharpLogicArr.length > 0) { // TODO: check here that the logic is formatted correctly

      // start timing the process
      console.time(`PROCESSING TIME (${bufferUID})`);

      // run through the array of promisified sharp processes
      await sharpLogicArr.reduce( (prev, curr) => {
        return prev.then(curr);
      }, Promise.resolve(imageToProcess))
      .then( result => {

        // end timing the process
        console.timeEnd(`PROCESSING TIME (${bufferUID})`);
        
        let processedImage = result;

        if (processedImage) {
          res.status(200).send({
            'error': null,
            'originalURL': req.body.url,
            'buffer': processedImage,
            'bufferUID': bufferUID
          });
        }
        else {
          return errorHandler(req, res, 'Failed to process image');
        }
    
      });
      
    }
    else {
      return errorHandler(req, res, 'Failed to process image');
    }
  }
  else {
    return errorHandler(req, res, 'Please provide a URL in the request body');
  }
});

module.exports = router;