'use strict';

const path = require('tidypath');
const val = require('tidyval');

module.exports = function parseFiles(files, parserObj){
	val(files).validate(['object','array']);
	files = val(files).to('array');
	val(parserObj).validate('object');

	return files.map(function (file){
		file.ext = path.ext(file.path);
		var parser = parserObj[file.ext.slice(1)];
		if (typeof parser === 'function'){
			file.parsed = parser(file.content);
			val(file.parsed).validate('object');
			for (var prop in file.parsed){
				if (prop.slice(0,1) === '_' &&
					prop !== '_ext' &&
					prop !== '_content' &&
					prop !== '_options'){
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
			/*
			Leave "as is", file content remains a buffer object
			Buffer.isBuffer(file.content) === true
			*/
			file.parsed = {
				_content : file.content,
			};
		}

		//Default to original file extension
		if (typeof file.parsed._ext === 'undefined'){
			file.parsed._ext = file.ext;
		}
		//Default to original file options
		if (typeof file.parsed._options === 'undefined'){
			file.parsed._options = file.options;
		}

		return file;
	});
};
