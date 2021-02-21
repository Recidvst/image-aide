// client triggers requests for images //

import isValidURL from './util/isValidURL';
import stripLeadingDotSlash from './util/stripLeadingDotSlash';
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
      
      if (nSrc.charAt(0) === '.' || nSrc.charAt(0) === '/') {
        // if local image, strip leading . & /
        nSrc = stripLeadingDotSlash(nSrc);
        // append domain to path
        if (nSrc.indexOf(window.location.hostname) === -1) {
          nSrc = window.location.hostname + (location.port ? ':' + location.port : '') + '/' + nSrc; 
        } 
      }  
      // if remote url, handle absolute vs relative
      else {
        if(/^(:\/\/)/.test(nSrc)){
          nSrc = 'http://'.concat(nSrc);
        }
        if(!/^(f|ht)tps?:\/\//i.test(nSrc)){
          nSrc = 'https://'.concat(nSrc);
        }   
      }

      // if localhost we can't send to server
      if (nSrc.indexOf('localhost:') > -1) {
        fallback(element, `http://${nSrc}`);
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
        element.setAttribute('data-imgaide-complete', Date.now()); // set finished time as unix timestamp in data attribute
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
      el.setAttribute('data-imgaide-complete', Date.now());
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
    el.setAttribute('data-imgaide-complete', Date.now());
  }
}

// trigger all functionality on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  triggerImageScraper();
});
