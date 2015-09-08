/* global resemble */
/* global $ */

var dataURLToBlob = function(dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    
    return new Blob([raw], {type: contentType});
  }
  
  // var parts = dataURL.split(BASE64_MARKER);
  // var contentType = parts[0].split(':')[1];
  // var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);
  
  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], {type: contentType});
}


$(document).ready(function(e) {
  var sourceImage = $('#source-image');
  var targetImage = $('#target-image');
  var diffImage = $('#diff-image');
  var sourceImageBlob = dataURLToBlob(sourceImage.attr('src'));
  var targetImageBlob = dataURLToBlob(targetImage.attr('src'));
  
  console.log(sourceImageBlob, targetImageBlob);
  
  resemble(sourceImageBlob).compareTo(targetImageBlob).onComplete(function(data) {
    diffImage.attr('src', data.getImageDataUrl());
  });
  
});