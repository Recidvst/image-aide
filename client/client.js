// client triggers requests for images //

// 1. loop over images to find those that need sending off
// 2. check if that url (or some other identifier) has been requested before and so is in cache
// 3. if in cache, return the cached base64 string
// 4. decode the base64 string and change the image src
// 5. if not in cache then send request to the server
// 6. receive server response and decode base64 string
// 7. add to cache and change the image src
// 8. on server error, fetch the original image directly (not cropped etc.)

import isValidURL from './util/isValidURL';

function triggerImageScraper() {
  // grab all images to be processed
  var imagesArr = [].slice.call(document.querySelectorAll('[data-imgaide]'));
  // loop
  imagesArr.forEach( element => {
    let nSrc = element.getAttribute('[data-imgaide-src');
    // check validity and then trigger processing or fallback
    if (nSrc && isValidURL(nSrc)) {
      // handle absolute vs relative 
      if (!'/^https?:\/\//i;'.test(nSrc)) {
        nSrc = 'https://'.concat(nSrc);
      }
      processImage(element, nSrc);
    }
    else if (isValidURL(element.src)) {
      fallback(element.src);
    }
    else {
      console.error('Something has gone wrong...', element);
    }
  });
}

// function to handle the actual image swapping
function processImage(el, src) {
  if (!el || !src || !isValidURL(src)) return false;

  console.log(el, src);
}

// function to be triggered in case of error - simply use the original image
function fallback(src) {
  if (isValidURL(src)) {
    element.src = src;
  }
}

// trigger all functionality on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  triggerImageScraper();
});