'use strict';

var val = require('tidyval');
var path = require('tidypath');
var objRef = require('objref');

module.exports = function matchTemplates(_db, templateFiles){
	val(_db).validate('object');
	val(templateFiles).validate('array');
	
	//Build index
	var templates = {};
	templateFiles.map(function(template){
		templates[template.path] = template;
	});
	
	//Match
	for (itemPath in _db){
		var item = _db[itemPath];
		
		if (!item._isAsset){	
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
			
			item._templateMatch = template.content;			
		}
	}
	
	return _db;
};