
# ImageAide.js

**_In Progress..._**

### A JavaScript tool to process and cache images without needing to host images externally. 

The frontend requests image processing from a dedicated Node API which fetches the request and manipulates the image before returning it to the frontend to hot replace the existing placeholder image. The returned images are cached in the user's browser to prevent unnecessary requests and create a super fast experience.

### Simple use

1. Set the `src` attribute of the image you want to process/cache to a placeholder (example `noise.png` provided).
2. Add a `data-imgaide-src` attribute to the image, with the real source URL. This must be a full, absolute URL.
3. Include the `ImageAide.js` file (not bundled for release as work still in progress).
3. Load the page!

### Cache control

By default the images requested by ImageAide are cached in the user's browser using the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache 'Cache API MDN docs') for 30 days. You can control this behaviour by applying the following data-atributes:

- __`data-imgaide-nocache`__
  - Disables the cache functionality to ensure that the image is always requested fresh. 
  - Doesn't take any parameters.
- __`data-imgaide-cacheexpiry`__
  - Sets the expiry time for the cache item.
  - Takes a single parameter (Integer passed as a String).
  - The expiry parameter can refer to either days or milliseconds. Any string longer than 5 characters will be taken as milliseconds, otherwise days.
  - Defaults to 30 (days)

### Image processing (via [Sharp](https://sharp.pixelplumbing.com/ 'Sharp docs'))

_coming soon_

### Todo

- Image processing logic!
- More server-side validation of requests
- Build scripts (Rollup?) for package publishing
- Python (Flask) version of the Node API as an alternate choice
- Test suite
