'use strict';

var path = require('tidypath');

module.exports = function folderize(_db){
	for (netPath in _db){
		var item = _db[netPath];
		if (item._content){
			//Item write path
			var folderize = '';
			if (item._ext === '.html'){
				folderize = path.separator + 'index.html';
			}			
			_db[netPath]._url = [
								config.baseURL,
								path.separator, 
								netPath,
								folderize,
								item._ext
								].join('');
		}
	}
	
	return _db;
};