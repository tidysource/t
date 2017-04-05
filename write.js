'use strict';

var path = require('tidypath');
var dir.mk(toWrite);

module.exports = function write(_db){
	var toWrite = [];
	for (netPath in _db){
		var item = _db[netPath];
		if (item._content){
			var fileObj = {};
			
			//Item write path
			fileObj.path = item._url;
							
			//Item content
			if (item._isAsset){
				fileObj.content = item._content;
			}
			else{
				fileObj.content = confing.templateEngine(item, _templates);
			}
			
			//Item write options
			fileObj.options = item._options;
					
			toWrite.push(fileObj);
		}
	}
	
	return dir.mk(toWrite);
};