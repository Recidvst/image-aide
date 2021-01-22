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
});
router.post('/request', async (req, res) => {
  if (req.body.url) {
    const response = await fetch(req.body.url);
    // get as type ArrayBuffer (Node)
    const buffer = await response.buffer();
    // let base64Buffer = buffer.toString('base64');
    res.status(200).send(buffer);
  }
  else {
    console.log('uh-oh');
    res.status(400).send('Please provide a URL in the request body');
  }
});

module.exports = router;