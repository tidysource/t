'use strict';

const val = require('tidyval');

module.exports = function valTest(str, rgx){
	val(rgx).validate(['regex','array']);
	rgx = val(rgx).to('array');

	var result = false;

	for (let i = 0; i < rgx.length; i++){
		val (rgx[i]).validate('regex');
		if (rgx[i].test(str)){
			result = true;
			break;
		}
	}

	return result;
};
