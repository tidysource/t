'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function matchTemplates(_db, teamplateFiles){
	val(_db).validate('object');
	val(templateFiles).validate('array');
	
	//Build index
	var templates = {};
	templateFiles.map(function(template){
		templates[template.path] = template.content;
	});
	
	//Match
	for (itemPath in db){
		var item = db[itemPath];
		var template = null;
		
		if (typeof templates[netPath] === 'string'){
			//Specific template
			template = templates[netPath];
		}
		else{
			//Find default template
			while(template === null){
				var i = netPath.lastIndexOf(path.separator) + 1;
				netPath = netPath.slice(0,i) + '_default';
				
				if (templates[netPath]){
					template = templates[netPath];
					break;
				}
				else if (i === 0){
					throw new Error('Missing template _default.');
					template = false;
					break;
				}
				else{
					//cd ..
					netPath = netPath.slice(0,i-1);
				}
			}
		}
		
		item._templateMatch = template;
	}
	
	return _db;
};