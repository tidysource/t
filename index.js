'use strict';

var dir = require('tidydir');
var path = require('tidypath');
var objRef = require('objref');
var tidyval = require('tidyval');

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
	File contents get parsed into an object (file.parsed) & ._isMeta.
	Every file gets _url and if string gets _content else 
	gets object (with isAsset:true) returned from parse.
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
	
	var _db = build_data(_db); //reference object to show relation between items in _db
	
	/*
	Write	//<--- CONTINUE HERE
	-----
	if item._content --> parse through template --> write
	else if item._isAsset (is not parsed, but a buffer) ---> write (just copy)
	else ignore
	
	//<--- what about extensions
	//<--- what about netPath/index.html for items?
	*/
	
	var toWrite = [];
	var itemAdded = {}; //helper obj
	
	files.map(function(file){
		if (!file._isMeta &&
			!itemAdded[file.netPath]){
			itemAdded[file.netPath] = true;
			var item = _db[file.netPath];
			
			var path = './public/';
			var content;
			var options;
			
			if(item._content){
				path += file.netPath;//<--- can be meta data file, not the content file
			}
			else if (item._isAsset){
				path += file.path;
				content = file.content;
				options = null;
			}
		}
	})
	
	for (netPath in db){
		var item = db[netPath];
		var content;
		var path;
		var options;
		
		if (item._content){
			if 
		}
		else if (item._isAsset){
			path = '.' + path.separator + netPath + ? <--- need data from original file object!
		}
		//templateEngine(item._data, item._templateMatch, _templates?)...
	}
	
	return dir.mk(toWrite);

	//---
	var pages = []; //file objects to make pages from
	
	//Match template
	for(var i=0; i<tree.files.length; ++i){
		var file = file = tree.files[i];
		if (file.parsed._content){
			//Match template
			var template = null;
			if (templates[netPath]){
				//Specific template
				template = templates[netPath];
			}
			else{
				//Find default template
				while(template === null){
					var i = netPath.lastIndexOf('/') + 1;
					netPath = netPath.slice(0,i) + '_default';
					
					if (templates[netPath]){
						template = templates[netPath];
						break;
					}
					else if (i === 0){
						throw new Error('Missing _default.');
						template = false;
					}
					else{
						//cd ..
						netPath = netPath.slice(0,i-1);
					}
				}
			}
			
			//Parse in template
			file._data._data = _data;
			file._data._templates = templates;
			var templated = config.engine(file._data, template, file);
			if (typeof templated === 'string'){
				templated = {
					content : templated,
					options : config.write.string, 
					path : file.netPath + path.separator + 'index.html'		
				}	
			}
			
			pages.push(templated);
		}
		if (file._isAsset){
			file.options = null;
			pages.push(file);
		}
	}
	
	//Write files
	return dir.mk(pages);
})
.catch(function(err){
	console.log(err);
});