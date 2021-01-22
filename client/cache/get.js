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
      // cache is stored as a buffer, so need to pull it out as such and convert
      const buffer = await response.arrayBuffer();
      // convert to an ObjectURL
      const ObjectURL = await bufferToImageURL(buffer);
      resolve(ObjectURL);
    }
    else {
      resolve(false);
    }
  });
}

// GET ALL CACHE ITEMS WHICH MATCH A CERTAIN CONDITION (AND CONVERT FROM BLOB TO B64)
// async function getFilteredCacheItems(conditionString = '?') {
//   // Get a list of all of the caches for this origin
//   const cacheNames = await caches.keys();
//   const resultsArr = [];

//   for (const name of cacheNames) {
//     // Open the cache
//     const cache = await caches.open(name);

//     // Get a list of entries. Each item is a Request object
//     for (const request of await cache.keys()) {
//       // If the request URL matches, add the response to the result
//       if (request.url.includes(conditionString)) {
//         var req = request.url;
//         var foundItem = await cache.match(request).then(result => result.blob());
//         var parsedItem = await blobToBase64(foundItem);
//         resultsArr.push({
//           [req]: parsedItem
//         });
//       }
//     }
//     // console.log(resultsArr);
//   }

//   return result;
// }

export {
  getCacheItem,
  // getFilteredCacheItems
}