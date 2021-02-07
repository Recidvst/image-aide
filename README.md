
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

---

- #### [Greyscale](https://sharp.pixelplumbing.com/api-colour#greyscale 'Sharp greyscale function')
*Takes one parameter ( __Boolean__ ).*
Usage:
```html
https://yoursite.com?greyscale=true
```
...this is equivalent to using Sharp directly like:
```javascript
sharp(input).greyscale(true)
```

---

- #### [Tint](https://sharp.pixelplumbing.com/api-colour#tint 'Sharp tint function')
*Takes one parameter ( RGB values | __String__ )*
*The RGB strong must be formatted as in the example below.*
Usage:
```html
https://yoursite.com?tint='rgb(100, 50, 90)'
```
...this is equivalent to using Sharp directly like:
```javascript
sharp(input).tint('rgb(100, 50, 90)')
```

---

- #### [Blur](https://sharp.pixelplumbing.com/api-colour#blur 'Sharp blur function')
*Takes one parameter ( sigma value | __Number/String__ )*
*This is a value between 0.3 and 1000 representing the sigma of the Gaussian mask and will be converted to a Float.*
Usage:
```html
https://yoursite.com?blur=10'
```
...this is equivalent to using Sharp directly like:
```javascript
sharp(input).blur(10)
```

---

### Todo

- Add more image processing options
- Example page
- More server-side validation of requests
- Test Rollup scripts before package publishing
- Test suite
- Python (Flask) version of the Node API as an alternate choice
