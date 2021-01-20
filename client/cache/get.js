import isCacheAvailable from './util/isCacheAvailable';
import blobToBase64 from './util/blobToBase64';
import isValidURL from './util/isValidURL';

// READ CACHE ITEM (AND CONVERT BLOBIFIED IMAGE RESPONSE TO B64)
function getCacheItem(cacheName = window.location.hostname, imageURL) {
  if (!isCacheAvailable || typeof imageURL === 'undefined' || !isValidURL(imageURL) ) return false;
  
  caches.open(cacheName).then(cache => {
    cache.match(imageURL).then(result => result.blob()).then(blob => {
      var parsedItem = await blobToBase64(foundItem);
      console.log(blob);
      console.log(parsedItem);
    });
  });
}

// GET ALL CACHE ITEMS WHICH MATCH A CERTAIN CONDITION (AND CONVERT FROM BLOB TO B64)
async function getFilteredCacheItems(conditionString = '?') {
  // Get a list of all of the caches for this origin
  const cacheNames = await caches.keys();
  const resultsArr = [];

  for (const name of cacheNames) {
    // Open the cache
    const cache = await caches.open(name);

    // Get a list of entries. Each item is a Request object
    for (const request of await cache.keys()) {
      // If the request URL matches, add the response to the result
      if (request.url.includes(conditionString)) {
        var req = request.url;
        var foundItem = await cache.match(request).then(result => result.blob());
        var parsedItem = await blobToBase64(foundItem);
        resultsArr.push({
          [req]: parsedItem
        });
      }
    }
    console.log(resultsArr);
  }

  return result;
}

export {
  getCacheItem,
  getFilteredCacheItems
}