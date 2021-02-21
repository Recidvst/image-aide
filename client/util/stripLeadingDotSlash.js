function stripLeadingDotSlash(str) {
  if (typeof str !== 'string') return false;
  if (str.charAt(0) === '.' || str.charAt(0) === '/') {
    str = str.substring(1);
    return stripLeadingDotSlash(str);
  }
  else {
    return str;
  }
}
export default stripLeadingDotSlash;