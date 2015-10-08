module.exports = (function () {
	var jsdiff = require('diff');
	
	function compareSources(sourceSource, targetSource) {
		var diff = jsdiff.diffChars(sourceSource, targetSource);
		console.dir(diff);
	}
	
	
	
	return {
		compareSources: compareSources
	};
})();