export default function(o) {
  return o instanceof Blob || Object.prototype.toString.call(o) === '[object Blob]';
}