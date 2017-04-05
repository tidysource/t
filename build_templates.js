'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function build_templates(files, templatesPath){
	_templates = {};
	
	files.map(function(template){
		template.path = template.path.slice(templatesPath.length);
		template.netPath = path.rmExt(template.path);
		var treePath = path.tree(netPath);
		var name = netPath.slice(treePath);
		
		var _templatesTree = templates;
		if (treePath.length){
			_templatesTree = objRef(_data, treePath, path.delimiter, true);
		}
		
		_templatesTree[name] = template.content;
	});
	
	return _templates;
};