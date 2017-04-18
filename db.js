'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function _db(files){
	//Deal with shared filenames
	var data = {};
	files.map(function (file){
		var id = file.path;
		if (typeof data[id] === 'undefined'){
			data[id] = file.parsed;
		}
		else if (file.parsed._isMeta &&
			file.parsed._ext === data[id]._ext){
			//Try to merge (shallow merge)
			for (var prop in file.parsed){
				if (typeof data[id][prop] === 'undefined'){
					data[id][prop] = file.parsed[prop];
				}
				else{
					throw new Error([
						'Property namespace conflict.',
						'Meta data can not share property names.',
					].join('\r\n'),);
				}
			}
		}
		else{
			throw new Error([
				'Filename conflict.',
				'Only meta data files with same extension',
				'may have the same filename.'
			].join('\r\n'),);
			//Namescpace conflig
		}
	});

	//
};
