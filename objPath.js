'use strict';

const val = require('tidyval');
const path = require('tidypath');
const rmLeading = require('rmleading');

module.exports = function objPath(filePath, folderPath){
	var str = filePath.slice(folderPath.length);
		str = path.rmExt(str);
		str = rmLeading(str, path.separator);

	return str;
};
