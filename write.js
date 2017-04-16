'use strict';

var path = require('tidypath');
var dir = require('tidydir');

module.exports = function write(_db, _templates, writePath, baseURL, templateEngine){
	var toWrite = [];
	for (var netPath in _db){
		var item = _db[netPath];
		if (item._content){
			var fileObj = {};

			//Item write path
			fileObj.path = writePath + item._url.slice(baseURL);

			//Item content
			if (item._isAsset){
				fileObj.content = item._content;
			}
			else{
				fileObj.content = templateEngine(item, item._templateMatch, _templates);
			}

			//Item write options
			fileObj.options = item._options;

			toWrite.push(fileObj);
		}
	}

	return dir.mk(toWrite);
};
