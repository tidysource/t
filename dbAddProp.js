'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function addProp(_db, propName, propVal){
	val(_db).validate('object');
	val(propName).validate('string');
	val(propName).invalidate('undefined');
	
	for (var item in _db){
		_db[item][propName] = propVal;
	}
	
	return _db;
};