import isBlob from './isBlob';

export default async function(blob) {
  if (typeof blob === 'undefined' || !isBlob(blob)) return false;
  return await URL.createObjectURL(blob);
}