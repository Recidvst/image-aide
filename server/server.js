// server fetches requested image, makes changes, encodes in base64 and then returns the base64 string

// 1. receive request with image URL provided
// 2. fetch the image
// 3. if error, return fail
// 4. if found, do the crop/optimisation etc. required
// 5. encode result as base64 and return to the client
// 6. OR encode as blob and return

// can this be a serverless function rather than a full api on a droplet?

// get core
const express = require('express');
// get packages
const morgan = require('morgan');
const pretty = require('express-prettify');
const cors = require('cors')
const bodyParser = require('body-parser');
const gnuHeader = require('node-gnu-clacks');

// config/env
require('dotenv').config();

// declare app
const app = express();
const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 3001;

// middleware
app.use(morgan('combined'))
app.use(cors());
app.use(pretty({ always: true, spaces: 2 }));
app.use(bodyParser.json()); // don't use for graphql endpoint
app.use(bodyParser.urlencoded({ extended: true }));
app.use(gnuHeader());

// define routes
const imagesRouter = require('./routes/image');

// get routes
app.use('/image', imagesRouter);

// CHECK ALIVE
app.use('/alive', function(req, res) {
  res.status(200).json({'hello':'world'});
});

// set the server listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// error handling?
process.on('uncaughtException', function (err) {
  console.error(err);
  console.error(err.stack);
});

module.exports = app;