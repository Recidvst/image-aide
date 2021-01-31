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
  res.set('Content-Type', 'application/json');

  if (req.body.url) {

    const errorHandler = (req, res) => {
      res.status(400).send({
        'error': 'Failed to fetch the image URL',
        'originalURL': req.body.url,
        'buffer': null
      });
    }

    const response = await fetch(req.body.url).catch(e => { 
      errorHandler(req, res);
    }).catch(e => { 
      return errorHandler(req, res);
    });

    // on error
    if (response && !response.ok) { 
      return errorHandler(req, res);
    }

    // TODO: add tests to confirm that the response was an image and not e.g. json or text

    // get as type ArrayBuffer (Node)
    const buffer = await response.buffer();
    res.status(200).send({
      'error': null,
      'originalURL': req.body.url,
      'buffer': buffer
    });
  }
  else {
    res.status(200).send({
      'error': 'Please provide a URL in the request body',
      'originalURL': req.body.url,
      'buffer': null
    });
  }
});

module.exports = router;