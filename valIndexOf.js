'use strict';

const val = require('tidyval');

module.exports = function valIndexOf(str, rgx){
	val(str).validate('string');
	val(rgx).validate(['regex','array']);
	rgx = val(rgx).to('array');

	var min = -1;

	rgx.map(function(pattern){
		val(pattern).validate('regex');
		var i = str.search(pattern);
		if (i < min){
			min = i;
		}
	});

	return min;
};
