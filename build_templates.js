'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function build_templates(files){
	var _templates = {};
	
	files.map(function(template){
		var treePath = path.tree(template.netPath);
		var name = template.netPath.slice(treePath);
		
		var _templatesTree = templates;
		if (treePath.length){
			_templatesTree = objRef(_templates, treePath, path.delimiter, true);
		}
		
		_templatesTree[name] = template.content;
	});
	
	return _templates;
};