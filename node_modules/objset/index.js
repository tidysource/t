'use strict';

const val = require('tidyval');
const objRef = require('objRef');
const rmTrailing = require('rmtrailing');

module.exports = function objSet(obj, path, separator, valToSet){
	val(obj).validate('object');
	val(path).validate('string');
	val(separator).validate('string');
	val(valToSet).invalidate('undefined');

	path = rmTrailing(path, separator);

	let i = path.lastIndexOf(separator);
	if (i < 1){
		obj[path] = valToSet;
	}
	else{
		let prop = path.slice(i+1);
		let tree = path.slice(0,i);
		objRef(obj, tree, separator, true)[prop] = valToSet;
	}

	return obj;
};
