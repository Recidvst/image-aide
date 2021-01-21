
export default async function(buffer) {
  if (!buffer) return false;
  // TODO: check if valid buffer
  
  var blob = new Blob( [ buffer  ], { type: "image/jpeg" } );
  return await URL.createObjectURL(blob);
}