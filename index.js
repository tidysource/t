'use strict';

var dir = require('tidydir');
var path = require('tidypath');
var val = require('tidyval');

var config = require('./config.js');
var parseFile = require('./parseFile.js');
var db = require('./db.js');
var dbAddProp = require('./dbAddProp.js');
var build_all = require('./build_all.js');
var build_templates = require('./build_templates.js');
var matchTemplates = require('./matchTemplates.js');
var build_data = require('./build_data.js');
var set_url = require('./set_url.js');
var write = require('./write.js');

module.exports = function t(param){
	val(param).validate(['undefined','object']);
	//Overwrite config with data in param
	if (typeof param === 'object'){
		config = Object.assign(config, param);
	}
	
	return Promise.all([
			dir.readTree(config.folders.data, null), //read data as buffer obj
			dir.readTree(config.folders.templates)
		]).then(function(result){
			var tree = result[0];
			var templatesTree = result[1];
		
			/*
			Net paths
			---------
			*/
			var files = tree.files.map(function(file){
				var str = file.path.slice(config.folders.data.length);
				file.netPath = path.rmExt(str);
			});
			var templates = templatesTree.files.map(function(templates){
				var str = template.path.slice(config.folders.templates.length);
				template.netPath = path.rmExt(str);
			});
			
			/*
			Parse files
			-----------
			File contents get parsed into an object (file.parsed).
		
			If file is meant to be present in result (written) then 
			it must have _content. It will also get a default ._ext
			which is the same as the extension of the original file.
			If file is not parsed it will automatically get _content
			(which is same as file content, by default buffer object).
			
			Parsers may not return objects starting with "_", 
			except ._ext and ._content, ._options and ._isAsset. 
			
			_isAsset property means the file should be copied as-is
			and therefor it won't be be parsed later in a template
			
			Only meta data files may share file name in same path
			*/
			files = parseFile(tree.files, confing.parse);
			
			/*
			Data objects
			------------
			All items relate to one another by their common path
			All data is stored in _db (array of objects)
			._data is an object for semantic referencing in the templating enigne
			each item stored in the _db has an array ._all (array of direct properties)
			as well as ._templates to enable referencing of templates
			*/
			var _db = db(files); //where data is kept
			_db = build_all(_db); //add ._all properties to items in db
			
			var _templates = build_templates(templates);	//Template files
			_db = dbAddProp(_db, '._template', _templates);	//add ._templates reference to all items
			_db = matchTemplates(_db, templates.files);	//add ._templateMatch reference to all items
			//Note: matched template will also provide fallback (unless set by parser) ._ext 
			
			_db = build_data(_db); //reference object to show relation between items in _db
			
			/*
			Set ._url
			---------
			Sets the ._url property (link to content)
			Make files that have .html extension to treePath/itemName/index.html
			*/
			_db = set_url(_db, config.baseURL);
			
			/*
			Write
			-----
			Nothing should change (just make file objects).
			
			if item._content write it
				if item._isAsset is falsy 
					run thgouth template engine
				else 
					just copy over
			else (no ._content) 
				ignore (don't write it's a meta data item)
			*/
			return write(_db, config.folders.result, config.baseURL);
		});	
};