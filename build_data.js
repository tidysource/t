'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function build_data(_db){
	var _data = {};
	
	val(_db).validate('object');
	
	for (var netPath in _db){	//file.netPath
		_db[netPath]._data = _data;
		
		var treePath = path.tree(netPath);
		var name = netPath.slice(treePath)

		var dbTree = _data;
		if (treePath.length){
			dbTree = objRef(_data, treePath, path.delimiter, true);
		}
		
		dbTree[name] = _db[netPath];
	}
		
	return _db;
};