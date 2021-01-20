import isBlob from './isBlob';

export default function(blob) {
  return new Promise((resolve) => {
    if (typeof blob === 'undefined' || !isBlob(blob)) reject('blobToBase64 requires a valid Blob as its argument');

    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  })
}