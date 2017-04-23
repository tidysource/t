'use strict';

var path = require('path');
var dotfile = require('./dotfile.js');
var file = require('./file.js');

module.exports = function tree(str){
	if (str === ''){
		return str;
	}
	else if (!file(str)){
		return str;
	}
	else{
		var dirname = path.dirname(str);
		if (dirname === '.'){
			if (str[0] !== '.' ||
				str === dotfile(str)){
				return '';
			}
		}
		return dirname;
	}
};
