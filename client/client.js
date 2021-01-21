// client triggers requests for images //

// 1. loop over images to find those that need sending off
// 2. check if that url (or some other identifier) has been requested before and so is in cache
// 3. if in cache, return the cached base64 string
// 4. decode the base64 string and change the image src
// 5. if not in cache then send request to the server
// 6. receive server response and decode base64 string
// 7. add to cache and change the image src
// 8. on server error, fetch the original image directly (not cropped etc.)
// 9. OR, instead of base64 use blob as this can be directly converted into an img src

import 'regenerator-runtime/runtime';
import isValidURL from './util/isValidURL';
import blobToImageURL from './util/blobToImageURL';
import b64testimage from './util/b64testimage';

function triggerImageScraper() {
  // grab all images to be processed
  var imagesArr = [].slice.call(document.querySelectorAll('[data-imgaide-src]'));
  
  imagesArr.forEach( element => {
    let nSrc = element.getAttribute('data-imgaide-src');
    // check validity and then trigger processing or fallback
    if (nSrc && isValidURL(nSrc)) {
      // handle absolute vs relative
      if(/^(:\/\/)/.test(nSrc)){
        nSrc = 'http://'.concat(nSrc);
      }
      if(!/^(f|ht)tps?:\/\//i.test(nSrc)){
        nSrc = 'https://'.concat(nSrc);
      }
      requestImage(element, nSrc);
    }
    else {
      fallback(element.src);
    }
  });
}

// function to request the image
function requestImage(el, src) {
  if (!el || !src || !isValidURL(src)) return false;

  // TODO: this is just a local sanity test, not connected to api
  fetch('data:image/png;base64,' + b64testimage()).then(function(response) {
    return response.blob();
  }).then(myBlob => {
    return blobToImageURL(myBlob);
  }).then(url => {
    if (url && url.indexOf('blob:http') === 0) {
      el.src = url;
    }
    else {
      console.error('Something has gone wrong...', el);
    }
  });
}

// function to be triggered in case of error - simply use the original image
function fallback(src) {
  if (isValidURL(src)) {
    element.src = src;
  }
  else {
    console.error('Something has gone wrong...', element);
  }
}

// trigger all functionality on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  triggerImageScraper();
});