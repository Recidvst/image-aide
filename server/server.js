// server fetches requested image, makes changes, encodes in base64 and then returns the base64 string

// 1. receive request with image URL provided
// 2. fetch the image
// 3. if error, return fail
// 4. if found, do the crop/optimisation etc. required
// 5. encode result as base64 and return to the client
// 6. OR encode as blob and return

// can this be a serverless function rather than a full api on a droplet?