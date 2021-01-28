const express = require('express');
const router = express.Router({mergeParams: true});
const fetch = require('node-fetch');

// encryption
const authFuncs = require('./auth');
const verifyToken = authFuncs.expressVerifyToken;

// TODO: use verifyToken to control access

// HANDLE IMAGE PROCESS REQUEST
router.get('/request', (req, res) => {
  res.status(200).send('Submit image processing requests here');
  return res;
});
router.post('/request', async (req, res) => {
  if (req.body.url) {

    const errorHandler = (req, res) => {
      // res.set('Content-Type', 'application/json');
      res.status(400).send({
        'error': 'Failed to fetch the image URL',
        'originalURL': req.body.url
      });
    }

    const response = await fetch(req.body.url).catch(e => { 
      errorHandler(req, res);
    });

    // on error
    if (response && !response.ok) { 
      errorHandler(req, res);
    }

    // get as type ArrayBuffer (Node)
    const buffer = await response.buffer();
    // let base64Buffer = buffer.toString('base64');
    res.status(200).send(buffer);
  }
  else {
    res.status(400).send('Please provide a URL in the request body');
  }
});

module.exports = router;