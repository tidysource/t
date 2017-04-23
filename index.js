'use strict';

const dir = require('tidydir');
const path = require('tidypath');
const val = require('tidyval');
const merge = require('tidymerge');

const nameConflict = require('./nameConflict.js');
const parseFile = require('./parseFile.js');
const setUrl = require('./setUrl.js');
const dataType = require('./dataType.js');
const db = require('./db.js');
const template = require('./template.js');
const matchTemplate = require('./matchTemplate.js');
const write = require('./write.js');

//Dotfile filter
var skipDotfile = function skipDotfile(input) {
	if (!path.dotfile(input) ||
		path.dotfile(input) === '.htaccess'){
		return true;
	}
	else{
		return false;
	}
};

module.exports = function t(param){
	val(param).validate(['undefined','object']);
	let config = require('./config.js');
	//Update config with data in param
	if (typeof param === 'object'){
		config = merge([config,param]);
	}
	val(config.folder.data).validate('string');
	val(config.folder.template).validate('string');
	return Promise.all([
		//Read data as buffer obj
		dir.readTree(config.folder.data, config.data.options, skipDotfile),
		dir.readTree(config.folder.template, config.template.options)
	])
	.then(function(result){
		let data = result[0];
		let templates = result[1];

		/*
		Check filname conflicts
		-----------------------
		Files and folders should not share the same name.

		Files should not share filenames.

		Throws error on a filename conflict.
		*/
		nameConflict(data.files, data.dirs);

		/*
		Parse
		-----
		File gets it's original file extension saved under file.ext

		Files that are (later) to appear in the result folder must
		have file.parsed._content

		file.parsed._ext is set by parser or defaults to original
		file extension.

		file.parsed._options is set by parser or defaults to original
		file options.

		To sum up a parser may set _content, _ext, _options as well
		as any other property NOT starting with "_".

		Sets
		file.parsed
		*/
		data.files = parseFile(data.files, config.parse);

		/*
		Set url path
		------------
		Sets
		file.parsed._url
		*/
		data.files = setUrl(data.files,
							config.folder.data,
							config.url.base,
							config.url.folderize,
							config.url.rebase);

		/*
		Data type
		---------
		Data type value is truthy/falsy

		All data types may be parsed via parser.

		Unlike "meta" data type "asset" and "content" will appear in
		the result folder. Difference between "asset" and "content"
		is that "asset" will NOT be parsed via template.

		Sets data type
		at file.parsed._isAsset
		or file.parsed._isMeta
		or file.parsed._isContent
		*/
		data.files = dataType(data.files, config.data.type);

		/*
		Make templates object
		---------------------
		*/
		let _template = template(templates.files, config.folder.template);

		/*
		Makde data objects for file.parsed
		----------------------------------
		Sets
		file.parsed._all (_db objects of direct content)
		file.parsed._tree (folder _db obj)
		file.parsed._db (_db object of data folder)
		file.parsed._dbPath (path within db object)
		file.parsed._template (templates object)
		*/
		data.files = db(data.files,
						data.dirs,
						config.folder.data,
						_template);

		/*
		Match template
		--------------
		Template is matched as same path (as data path), but in
		template folder. Otherwise, the deepest template named
		_default in the same path.

		Template matching is relative to data folder. That way
		it's possible to change the url paths without breaking
		template matching.

		Sets
		file.parsed._templateMatch
		*/
		data.files = matchTemplate(data.files,
									templates.files,
									config.folder.data,
									config.folder.template);

		/*
		Write
		-----
		Nothing should change (just make file objects).
		*/
		return write(data.files,
					config.folder.result,
					config.url.base,
					config.template.engine,
					_template);
	});
};
