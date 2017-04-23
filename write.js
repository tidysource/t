'use strict';

const dir = require('tidydir');
const val = require('tidyval');
const path = require('tidypath');
const rmTrailing = require('rmTrailing');

module.exports = function write(files,
								resultFolderPath,
								baseURL,
								templateEngine,
								_template){
	val(files).validate('array');
	val(resultFolderPath).validate('string');
	val(baseURL).validate('string');
	val(templateEngine).validate('function');
	val(_template).validate('object');
	let toWrite = [];
	files.map(function (file){
		let filePath = [
						rmTrailing(resultFolderPath, path.separator),
						path.separator,
		 				file.parsed._url.slice(baseURL.length)
						].join('');
		let fileObj = {
			path : filePath,
			options : file.parsed._options
		};
		if (file.parsed._isContent){
			fileObj.content = templateEngine(file.parsed,
											file.parsed._templateMatch,
											_template);

		}
		else if (file.parsed._isAsset){
			fileObj.content = file.parsed._content;
		}
		//else file.parsed._isMeta

		if (typeof fileObj.content !== 'undefined'){
			console.log(fileObj.path, file.parsed._url)
			toWrite.push(fileObj);
		}
	});
	return dir.mk(toWrite);
};
