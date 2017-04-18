'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function _db(files){
	//Deal with shared filenames
	var data = {};
	files.map(function (file){
		var id = path.rmExt(file.path);
		if (typeof data[id] === 'undefined'){
			data[id] = file.parsed;
		}
		else{
			throw new Error([
							'Filename conflict at ',
							file.path
							].join('\r\n'));
		}
	});

	//Remove
};
