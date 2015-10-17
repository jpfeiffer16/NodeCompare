module.exports = (function () {
	var jsdiff = require('diff');
	
	function compareSources(sourceSource, targetSource, callback) {
    process.nextTick(function() {
		  var diff = jsdiff.diffChars(sourceSource, targetSource);
      if (typeof(callback) == 'function') {
        callback(diff);
      }
    });
	}
	
	return {
		compareSources: compareSources
	};
})();