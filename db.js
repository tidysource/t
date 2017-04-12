'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function build_db(files){
	val(files).validate('array');
	
	var _db = {}
	files.map(function(file){
		val(file).validate('object');
		val(file.netPath).validate('string');
		
		if (typeof _db[file.netPath] === 'undefined'){
			_db[file.netPath] = {};
		}
		
		//Merge
		for (var prop in file.parsed){
			if (typeof _db[file.netPath][prop] === 'undefined'){
				_db[file.netPath][prop] = file.parsed[prop];
			}
			else{
				throw new Error('Filename/filecontent conflict');
			}
		}
	});

	return _db;
};