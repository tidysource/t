'use strict';

const val = require('tidyval');
const objPath = require('./objPath.js');
const path = require('tidypath');

module.exports = function matchTemplate(files,
										templateFiles,
										dataFolderPath,
										templateFolderPath){
	val(files).validate('array');
	val(templateFiles).validate('array');

	//Build Index
	var templates = {};
	templateFiles.map(function (file){
		val(file).validate('object');
		val(file.path).validate('string');
		val(file.content).validate('string');
		templates[objPath(file.path, templateFolderPath)] = file.content;
	});

	//Match
	return files.map(function (file){
		val(file).validate('object');
		val(file.parsed).validate('object');
		val(file.path).validate('string');
		if (file.parsed._isContent){
			let checkPath = objPath(file.path, dataFolderPath);
			let template = null;
			if (typeof templates[checkPath] === 'string'){
				//Specific template
				template = templates[checkPath];
			}
			else{
				//Find default template
				while(template === null){
					let i = checkPath.lastIndexOf(path.separator) + 1;
					checkPath = checkPath.slice(0,i) + '_default';
					if (templates[checkPath]){
						template = templates[checkPath];
						break;
					}
					else if (i === 0){
						throw new Error('Missing template _default');
						template = false;
						break;
					}
					else{
						//cd ..
						checkPath = checkPath.slice(0,i-1);
					}
				}
			}

			file.parsed._templateMatch = template;
		}

		return file;
	});
};
