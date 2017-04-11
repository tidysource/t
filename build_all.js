'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function build_arr(_db){	
	val(_db).validate('object');
	
	for (netPath in _db){	//file.netPath
		var treePath = path.tree(netPath);
		var name = netPath.slice(treePath)

		var dbTree = _db[treePath];
		var dbItem = dbTree[name];
		
		if (typeof dbTree._all === 'undefined'){
			dbTree._all = [];
		}
		dbTree._all.push(dbItem);
	}
	
	return _db;
};