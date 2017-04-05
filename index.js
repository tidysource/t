'use strict';

var dir = require('tidydir');
var path = require('tidypath');

var config = require('./config.js');;
var parseFile = require('./parse.js');
var db = require('./db.js');
var dbAddProp = require('./dbAddProp.js');
var build_all = require('./build_all.js');
var build_templates = require('./build_templates.js');
var matchTemplates = require('./matchTemplates.js');
var build_data = require('./build_data.js');

Promise.all([
	dir.readTree(config.folders.data, null), //read data as buffer obj
	dir.readTree(config.folders.templates)
]).then(function(result){
	var tree = result[0];
	var templates = result[1];

	//Make netPath and treePath for each file
	var files = tree.files.map(function(file){
		file.netPath = path.rmExt(file.netPath);
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
	
	var _templates = build_templates(templates.files);	//Template files
	_db = dbAddProp(_db, '._template', _templates);	//add ._templates reference to all items
	_db = matchTemplates(_db, templates.files);	//add ._templateMatch reference to all items
	//Note: matched template will also provide fallback (unless set by parser) ._ext 
	
	var _db = build_data(_db); //reference object to show relation between items in _db
	
	/*
	Write
	-----
	if item._content write it
		if item._isAsset is falsy 
			run thgouth template engine
		else 
			just copy over
	else (no ._content) 
		ignore (don't write it's a meta data item)
	*/
	var toWrite = [];
	for (netPath in _db){
		var item = _db[netPath];
		if (item._content){
			var fileObj = {};
			
			//Item write path
			var folderize = '';
			if (item._ext === '.html'){
				folderize = path.separator + 'index.html';
			}			
			fileObj.path = [
							config.folders.result, 
							path.separator, 
							netPath,
							folderize,
							item._ext
							].join('');
							
			//Item content
			if (item._isAsset){
				fileObj.content = item._content;
			}
			else{
				fileObj.content = confing.templateEngine(item, _templates);
			}
			
			//Item write options
			fileObj.options = item._options;
					
			toWrite.push(fileObj);
		}
	}
	
	return dir.mk(toWrite);
})
.catch(function(err){
	console.log(err);
});