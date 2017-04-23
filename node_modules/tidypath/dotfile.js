'use strict';

var path = require('path');

module.exports = function dotfile(str){
	let result = '';
	let slash = str.lastIndexOf(path.sep);
	if (slash < 0){ //Slash not found
		if (str[0] === '.' &&
			str !== '.'){
			result = str;
		}
	}
	else{
		let dot = str.slice(slash).indexOf('.') + slash; //1st dot after slash
		if (slash + 1 === dot){	//1st dot is found and immediately after slash 
			result = str.slice(dot);
		}
	}
	return result;

	/*
	Regex alternative:
	(?:^|[\\\/\.])\.[^\\\/]+$
	Although should only include
	separator, not escape character;
	just use new new RegExp() & path.sep
	*/
};
