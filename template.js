'use strict';

const val = require('tidyval');
const path = require('tidypath');
const objRef = require('objref');
const objPath = require('./objPath.js');

module.exports = function _templates(files, templatesFolderPath){
	val(files).validate('array');

	var templates = {};
	files.map(function(template){
		val(template).validate('object');

		var templateObjPath = objPath(template.path, templatesFolderPath);

		var treePath = path.parent(templateObjPath);
		var name = templateObjPath.slice(treePath.length);

		var templatesTree = templates;
		if (treePath.length){
			templatesTree = objRef(templates, treePath, path.delimiter, true);
		}

		templatesTree[name] = template.content;
	});

	return templates;
};
