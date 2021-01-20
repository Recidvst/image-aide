// client triggers requests for images //

// 1. loop over images to find those that need sending off
// 2. check if that url (or some other identifier) has been requested before and so is in cache
// 3. if in cache, return the cached base64 string
// 4. decode the base64 string and change the image src
// 5. if not in cache then send request to the server
// 6. receive server response and decode base64 string
// 7. add to cache and change the image src
// 8. on server error, fetch the original image directly (not cropped etc.)