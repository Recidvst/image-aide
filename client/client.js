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

import isValidURL from './util/isValidURL';
import bufferToImageURL from './util/bufferToImageURL';
import { putCacheItemManually } from './cache/add';
import { getCacheItem } from './cache/get';

function triggerImageScraper() {
  // grab all images to be processed
  var imagesArr = [].slice.call(document.querySelectorAll('[data-imgaide-src]'));
  
  imagesArr.forEach( async (element) => {
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
      
      // if nocache attribute set then skip cache (so content is always fresh)
      let inCacheURL = null;
      const nocachePreference = element.hasAttribute('data-imgaide-nocache');
      
      if (!nocachePreference) {
        // else check cache in case exact image has been requested before
        inCacheURL = await getCacheItem('testcachename', nSrc);
      }

      // replace image with cached image
      if (inCacheURL && inCacheURL.indexOf('blob:http') === 0) {
        element.src = inCacheURL;
      }
      // otherwise fetch a fresh image
      else {
        requestImage(element, nSrc);
      }
    }
    else {
      fallback(element, element.src);
    }
  });
}

// function to request the image
async function requestImage(el, src) {
  if (!el || !src || !isValidURL(src)) return false;

  const errorHandler = () => {
    fallback(el, el.src);
    return false;
  };

  const response = await fetch('http://localhost:3001/image/request', { // obviously this needs to change, will be handled by an ENV variable
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "url": src
    })
  }).catch(e => { 
    return errorHandler();
  });

  // on error
  if (!response.ok) {
    return errorHandler();
  }

  // read response
  const responseJSON = await response.json();

  // if buffer returned successfully
  if (!responseJSON.error && responseJSON.buffer) {
    // returned from the server as type ArrayBuffer (Node)
    const buffer = responseJSON.buffer.data || responseJSON.buffer;
    // convert to type Buffer (browser)
    const arrayBufferView = new Uint8Array(buffer);
    // convert to an ObjectURL
    const ObjectURL = await bufferToImageURL(arrayBufferView);
  
    if (ObjectURL && ObjectURL.indexOf('blob:http') === 0) {
      // if ok, update image src
      el.src = ObjectURL; // TODO: we want to trigger IntersectionObserver here so that the image isn't loaded until its needed. Simple fadein animation.
      // is there a cache expiry preference set?
      const cacheExpiry = el.getAttribute('data-imgaide-cacheexpiry') || undefined;
      // is there a cache true/false preference set?
      const nocachePreference = el.hasAttribute('data-imgaide-nocache');
      if (!nocachePreference) {
        // add to cache
        putCacheItemManually('testcachename', src, responseJSON.buffer, cacheExpiry);
      }
      return true;
    }
  }
  return false;
}

// function to be triggered in case of error - simply use the original image or the placeholder if not available
function fallback(el, src) {
  if (isValidURL(src)) {
    el.src = src;
  }
}

// trigger all functionality on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  triggerImageScraper();
});
