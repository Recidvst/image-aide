
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

- #### [Blur](https://sharp.pixelplumbing.com/api-operation#blur 'Sharp blur function')
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

- #### [Trim](https://sharp.pixelplumbing.com/api-resize#trim 'Sharp trim function')
*Takes one parameter ( threshold | __Number/String__ )*
*This is a value representing the allowed difference from the top-left pixel when cropping 'boring' pixels based on the value of the top-left pixel. Defaults to 10.*
Usage:
```html
https://yoursite.com?trim=30'
```
...this is equivalent to using Sharp directly like:
```javascript
sharp(input).trim(30)
```

---

- #### [Flip](https://sharp.pixelplumbing.com/api-operation#flip 'Sharp flip function')
*Takes one parameter ( __Boolean__ ).*
*This is simply a boolean yes/no value and is not required. Defaults to true.*
Usage:
```html
https://yoursite.com?flip
```
...this is equivalent to using Sharp directly like:
```javascript
sharp(input).flip(true)
```

---

- #### [Flop](https://sharp.pixelplumbing.com/api-operation#flop 'Sharp flop function')
*Takes one parameter ( __Boolean__ ).*
*This is simply a boolean yes/no value and is not required. Defaults to true.*
Usage:
```html
https://yoursite.com?flop
```
...this is equivalent to using Sharp directly like:
```javascript
sharp(input).flop(true)
```

---

- #### [Rotate](https://sharp.pixelplumbing.com/api-operation#rotate 'Sharp rotate function')
*This option comes in two parts: `rotate` & `rotateBackground`.*
*rotate takes one parameter ( __Number/String__ ). This is the angle of rotation.*
*rotateBackground takes one parameter ( RGB values | __String__ ). This is an RGB string value which will fill the segments left by the rotation if the rotation isn't a multiple of 90deg. Defaults to #0000000.*
Usage:
```html
https://yoursite.com?rotate=120&rotateBackground='rgb(100, 50, 90)'
```
...this is equivalent to using Sharp directly like:
```javascript
sharp(input).rotate(120, {
  'background': 'rgb(100, 50, 90)' 
})
```

---

### Todo

- Add more image processing options
- Improve documentation, particularly of the Sharp options.
- Example page
- More server-side validation of requests
- Test Rollup scripts before package publishing
- Test suite