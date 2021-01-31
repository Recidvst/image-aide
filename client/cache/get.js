import isCacheAvailable from '../util/isCacheAvailable';
import bufferToImageURL from '../util/bufferToImageURL';
import isValidURL from '../util/isValidURL';

// READ CACHE ITEM (AND CONVERT BUFFER TO USABLE OBJECTURL)
function getCacheItem(cacheName = window.location.hostname, imageURL) {
  return new Promise( async function(resolve) {
    if (!isCacheAvailable || typeof imageURL === 'undefined' || !isValidURL(imageURL) ) return false;
    
    const options = {
      ignoreSearch: false,
      ignoreMethod: true,
      ignoreVary: false
    };

    const cache = await caches.open(`${cacheName}__imgaide`);
    const response = await cache.match(imageURL, options);
    // if cache item found
    if (response) {
      // parse response
      const responseJSON = await response.json();
      if (!responseJSON.error && responseJSON.buffer) {
        // returned from the cache as type ArrayBuffer (Node)
        const buffer = responseJSON.buffer.data || responseJSON.buffer
        // cache is stored as a buffer, so need to pull it out as such and convert
        const arrayBufferView = new Uint8Array(buffer);
        // convert to an ObjectURL
        const ObjectURL = await bufferToImageURL(arrayBufferView);
        
        resolve(ObjectURL);
      }
      else {
        resolve(false);
      }
    }
    else {
      resolve(false);
    }
  });
}

export {
  getCacheItem
}