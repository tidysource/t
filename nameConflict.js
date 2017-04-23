'use strict';

const path = require('tidypath');
const val = require('tidyval');

module.exports = function nameConflict(files, folders){
	val(files).validate('array');
	val(folders).validate('array');

	var folderIndex = {};
	folders.map(function (folderPath){
		val(folderPath).validate('string');
		folderIndex[folderPath] = true;
	});

	var fileIndex = {};
	files.map(function (file){
		val(file).validate('object');
		val(file.path).validate('string');
		var filePath = path.rmExt(file.path);
		if (folderIndex[filePath]){
			throw new Error ([
							'Filename conflict at ',
							filePath,
							'Files and folders with same parent ' +
							'folder, must not have the same name.'
							].join('\r\n'));
		}
		else if (fileIndex[filePath]){
			throw new Error([
						'Filename conflict at ',
						filePath,
						'Files should not share filenames.'
						].join('\r\n'));
		}
		else{
			fileIndex[filePath] = true;
		}
	});
};
