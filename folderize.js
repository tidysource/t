'use strict';

var path = require('tidypath');

module.exports = function folderize(_db){
	for (netPath in _db){
		var item = _db[netPath];
		if (item._content){
			//Item write path
			var folderizeStr = '';
			if (item._ext === '.html'){
				folderizeStr = path.separator + 'index.html';
			}			
			_db[netPath]._url = [
								config.folders.result, 
								path.separator, 
								netPath,
								folderizeStr,
								item._ext
								].join('');
		}
	}
	
	return _db;
};