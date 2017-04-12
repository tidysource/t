'use strict';

var path = require('tidypath');

module.exports = function parseFile(files, parserObj){
	if (typeof file === 'string'){
		files = [files];
	}
	else if (!Array.isArray(files)){
		throw new Error ('Invalid paramter: files');
	}
	
	return files.map(function (file){
		file.ext = path.ext(file.path);
		var parser = parserObj[file.ext.slice(1)];
		
		if (typeof parser === 'function'){
			file.parsed = parser(file.content);
			for (var prop in file.parsed){
				if (prop.slice(0,1) === '_' && 
					prop !== '_ext' &&
					prop !== '_content' &&
					prop !== '_options' &&
					prop !== '_isAsset'){
					throw new Error([
									'Invalid property:',prop,
									'names starting with "_" are reserved'
									].join('\n'));
				}
			}
		}
		else if (typeof parser === 'string'){
			var encoding = parser;
			file.parsed = {
				_content : file.content.toString(encoding),
			};
		}
		else{
			//it's a buffer object (Buffer.isBuffer(file.content))
			file.parsed = {
				_content : file.content,
				_isAsset : true,
			};
		}
		
		//For writeables
		if (file.parsed._content){
			//Set default options (same as content source file)
			if (typeof file.parsed._options === 'undefined'){
				file.parsed._options = file.options;
			}
			//Set default extension (same as content source file)
			if (typeof file.parsed._ext === 'undefined'){
				file._ext = path.ext(file.path);
			}
		}
		
		return file;
	});	
};