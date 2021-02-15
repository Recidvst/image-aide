
# ImageAide.js

**_In Progress..._**

### A JavaScript/Node tool to process and cache images without needing to host images externally.

The frontend requests image processing from a dedicated Node API which fetches the request and manipulates the image before returning it to the frontend to hot replace the existing placeholder image. The returned images are cached in the user's browser to prevent unnecessary requests and create a super fast experience.

---

### Usage

_The tool requires two separate components to function_:
- Javascript library (client-side)
- Node API (server-side)

#### Server

1. Set up a simple Node server (on a Digital Ocean droplet or similar) and pull the `server` folder within this repo.
2. Run `npm run prod` to start the server with `pm2`.

#### Client

1. Include the relevant bundle file from the `bundle` folder under `client`. There are bundle files available for ESM and CJS as well as plain JS.  
2. For each of the image(s) you want to process, set the `src` attribute to a placeholder image (example `noise.png` provided).
3. Add a `data-imgaide-src` data attribute to the image(s), with the real source URL. This must be a full, absolute URL.
4. Add desired processing command parameters to the URL within `data-imgaide-src`. These apply the Sharp image processing functions.
5. Add any caching data attributes you want to apply to the individual image.
6. Load the page!

---

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

---

### Image processing (via [Sharp](https://sharp.pixelplumbing.com/ 'Sharp docs'))
Image processing is handled by applying parameters to the URL provided to the the `data-imgaide-src` data attribute.

You can apply as many of these as required, and they should be chained as normal e.g. `?greyscale=true&flip&blur=10`

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

- #### [Resize](https://sharp.pixelplumbing.com/api-resize#resize 'Sharp resize function')
*This consists of a group of related functions relating to resizing an image. They are best described separately as they are implemented via separate parameters in ImageAide*

##### Width and height
*These are two separate parameters and can be used together or separately.*

*Both width and height take one parameter ( __Number/String__ ). This is a size in pixels.*

Usage:
```html
https://yoursite.com?width=100&height=100
```
```javascript
sharp(input).resize({
  width: 100,
  height: 100
})
```

##### Scale width and scale height
*This consists of two parameters which can be used together or separately as per width/height: `scaleWidth` & `scaleHeight`*

*Both scaleWidth and scaleHeight take one parameter ( __Number/String__ ). This is a percentage size expressed as a decimal fraction and must be within the bounds 0.1 -> 1.*

*The scaling is based on the inherent size values of the image itself.*

*If present these two parameters will override width and height respectively, but can be used interchangeably e.g. width alongside scaleHeight.*

Usage:
```html
https://yoursite.com?scaleWidth=0.5
```
```javascript
sharp(input).resize(Math.round(width * 0.5))
```

##### Fit
*When width/height or scaleWidth/scaleHeight are used, this parameter can be set to control the method by which the image should fit the newly defined size.*

*Fit takes one parameter ( __String__ ). This is the fit method and must be one of the below*

- cover (default) | Preserving aspect ratio, ensure the image covers both provided dimensions by cropping/clipping to fit.
- contain | Preserving aspect ratio, contain within both provided dimensions using "letterboxing" where necessary.
- fill | Ignore the aspect ratio of the input and stretch to both provided dimensions.
- inside | Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
- outside | Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.

Usage:
```html
https://yoursite.com?fit=contain
```
```javascript
sharp(input).resize({
  fit: 'contain'
})
```

##### Position
*The position parameter is used to control the positioning of the image when a `fit` method is applied.*

*Position takes one parameter ( __String__ ). This must be one of the below options:*

*When using a `fit` of cover or contain, the default position is centre.*

`[ top, right top, right, right bottom, bottom, left bottom, left, left top ]`

Usage:
```html
https://yoursite.com?position='right bottom'
```
```javascript
sharp(input).resize({
  position: 'right bottom'
})
```

##### Gravity
*In place of position the Gravity parameter is also available.*

*Gravity takes one parameter ( __String__ ). This must be one of the below options:*

*When using a `fit` of cover or contain, the default position is centre.*

`[ north, northeast, east, southeast, south, southwest, west, northwest, center or centre ]`

Usage:
```html
https://yoursite.com?gravity=southwest
```
```javascript
sharp(input).resize({
  gravity: 'southwest'
})
```

##### Strategy
*As well as the specific positioning options provided by `position` and `gravity`, it is also possible to provided a `strategy` value which aims to calculate the position to best show off the content of the image.*

*Quoting Sharp's docs: "The experimental strategy-based approach resizes so one dimension is at its target length then repeatedly ranks edge regions, discarding the edge with the lowest score based on the selected strategy."*

*Strategy takes one parameter ( __String__ ). This must be one of the below options:*

- `entropy`: focus on the region with the highest [Shannon entropy](https://en.wikipedia.org/wiki/Entropy_%28information_theory%29 'Entropy information theory information').
- `attention`: focus on the region with the highest luminance frequency, colour saturation and presence of skin tones.
*__Strategy is only available when using the `cover` fit method.__*

Usage:
```html
https://yoursite.com?gravity=southwest
```
```javascript
sharp(input).resize({
  gravity: 'southwest'
})
```

##### Kernel
__Untested work in progress__

*It is possible to specify the desired interpolation kernel for use with the `strategy` method.*

*Kernel takes one parameter ( __String__ ). This must be one of the below options.*

- `nearest`: Use nearest neighbour interpolation .
- `cubic`: Use a Catmull-Rom spline .
- `mitchell`: Use a Mitchell-Netravali spline .
- `lanczos2`: Use a Lanczos kernel  with a=2.
- `lanczos3`: Use a Lanczos kernel with a=3 (the default).

Usage:
```html
https://yoursite.com?kernel=mitchell
```
```javascript
sharp(input).resize({
  kernel: 'mitchell'
})
```

##### Background
*When using a `fit` of `contain`, the image may be smaller than the original size, leaving empty space which can be filled with the background parameter.*

*Background takes one parameter ( RGB values | __String__ ). This must be an RGB string value. Defaults to black.*

Usage:
```html
https://yoursite.com?background='rgb(100, 50, 90)'
```
```javascript
sharp(input).resize({
  background: 'rgb(100, 50, 90)'
})
```

##### withoutEnlargement 
*Takes one parameter ( __Boolean__ ). Defaults to `false`.*

*Setting `withoutEnlargement` to `true` will prevent Sharp enlarging the image if the width and height are already less than the user specified dimensions.*

Usage:
```html
https://yoursite.com?withoutEnlargement=true
```
```javascript
sharp(input).resize({
  withoutEnlargement: true
})
```

##### fastShrinkOnLoad 
*Takes one parameter ( __Boolean__ ). Defaults to `true`.*

*Setting `fastShrinkOnLoad` to `true` will allow Sharp to take greater advantage of the JPEG and WebP shrink-on-load feature. but this can also lead to a slight moiré pattern on some images.*

Usage:
```html
https://yoursite.com?fastShrinkOnLoad=true
```
```javascript
sharp(input).resize({
  fastShrinkOnLoad: true
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
