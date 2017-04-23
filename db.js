'use strict';

const val = require('tidyval');
const path = require('tidypath');
const objPath = require('./objPath.js');
const objRef = require('objref');
const rmTrailing = require('rmTrailing');
const rmLeading = require('rmLeading');

module.exports = function _db(files, dirs, dataFolderPath, _template){
	val(files).validate('array');
	let db = {
		_all : [],
		_db : this,
		_tree : null,
		_template : _template,
	};

	dirs.map(function (dirPath){
		dirPath = objPath(dirPath, dataFolderPath);
		dirPath = rmTrailing(dirPath, path.separator);
		let treePath = path.parent(dirPath);
		let name = dirPath.slice(treePath.length);
		name = rmLeading(name, path.separator);

		let dbTree = db;
		if (treePath.length){
			dbTree = objRef(db, treePath, path.delimiter, true);
		}

		let dir = {
			_all : [],
			_db : db,
			_tree : dbTree,
			_template : _template
		};
		dbTree[name] = dir;
		dbTree._all.push(dir);
	});

	return files.map(function (file){
		let dbPath = objPath(file.path, dataFolderPath);
		file.parsed._dbPath = dbPath;

		let treePath = path.tree(dbPath + '.extForTree');
		let name = dbPath.slice(treePath.length)
		name = rmLeading(name, path.separator);;

		let dbTree = db;
		if (treePath.length){
			dbTree = objRef(db, treePath, path.separator, true);
		}

		dbTree[name] = file.parsed;

		//._all, ._db, ._tree
		dbTree._all.push(file.parsed);
		file.parsed._all = [];
		file.parsed._db = db;
		file.parsed._tree = dbTree;
		file.parsed._template = _template;

		return file;
	});
};
