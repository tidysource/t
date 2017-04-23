'use strict';

var path = require('path')
var tree = require('./tree.js');
var rmTrailing = require('rmTrailing');

module.exports = function parent(str){
	str = rmTrailing(str, path.sep);
	return tree(str + '.dummyExt');
};
