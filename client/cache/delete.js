import isCacheAvailable from './util/isCacheAvailable';
import isValidURL from './util/isValidURL';

// DELETE CACHE ITEM - WHOLE CACHE BLOCK
function deleteCacheItem(cacheName = window.location.hostname) {
  if (!isCacheAvailable) return false;

  caches.delete(cacheName).then(function() {
    // console.log('Cache block successfully deleted!');
  });
}

// DELETE CACHE ITEM - SPECIFIC URL WITHIN CACHE BLOCK
function deleteCacheBlock(cacheName = window.location.hostname, imageURL) {
  if (!isCacheAvailable || typeof imageURL === 'undefined' || !isValidURL(imageURL) ) return false;

  caches.open(cacheName).then(cache => {
    cache.delete(imageURL).then(function() {
      // console.log('Cache item successfully deleted!');
    });
  })
}

export {
  deleteCacheItem,
  deleteCacheBlock
}