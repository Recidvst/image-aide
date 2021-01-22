import isCacheAvailable from '../util/isCacheAvailable';
import isValidURL from '../util/isValidURL';
import isArray from '../util/isArray';

// ADD CACHE ITEM
function addCacheItem(cacheName = window.location.hostname, imageURL) {
  if (!isCacheAvailable || typeof imageURL === 'undefined' || !isValidURL(imageURL) ) return false;

  caches.open(cacheName).then( cache => {
    cache.add(url).then( () => {
      // console.log("Cache item added");
    });
  });
}

// ADD ARRAY OF CACHE ITEMS
function addCacheItemArray(cacheName = window.location.hostname, imageArray) {
  if (!isCacheAvailable || typeof imageURL === 'undefined' || !isArray(imageArray) ) return false;
  // TODO: loop over array here and remove any URLs which are not valid

  caches.open(cacheName).then( cache => {
    cache.addAll(urls).then( () => {
      // console.log("Cache array of items added");
    });
  });
}

// ADD NEW/REPLACE EXISTING CACHE ITEM WITH PUT
function putCacheItemManually(cacheName = window.location.hostname, imageURL, responseData) {
  if (!isCacheAvailable || typeof imageURL === 'undefined' || !isValidURL(imageURL) ) return false;

  caches.open(cacheName).then( cache => {
    cache.put(`${imageURL}__uniqueID`, new Response(responseData));
  })
}

// ADD NEW/REPLACE EXISTING CACHE ITEM WITH PUT (FROM FETCH)
function putCacheItemFromFetch(cacheName = window.location.hostname, imageURL) {
  if (!isCacheAvailable || typeof imageURL === 'undefined' || !isValidURL(imageURL) ) return false;

  fetch(imageURL).then(res => {
    return caches.open(cacheName).then(cache => {
      return cache.put(imageURL, res);
    })
  })
}

export {
  addCacheItem,
  addCacheItemArray,
  putCacheItemManually,
  putCacheItemFromFetch,
}