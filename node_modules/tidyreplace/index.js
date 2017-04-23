'use strict';

const val = require('tidyval');

module.exports = function replace(str, substr, newSubstr, data){
	val(str).validate('string');
	val(substr).validate(['string', 'regex']);
	val(newSubstr).validate(['string', 'function']);
	val(data).validate(['object', 'array', 'undefined']);

	if (typeof newSubstr === 'function'){
		str = str.replace(substr, function (){
			var arg = [];
			for (var i in arguments){
				arg[i] = arguments[i];
			}
			var param = {
				match : arg[0],
				submatch : arg.slice(1,-2),
				offset : arg[arg.length-2],
				string : arg[arg.length-1]
			}

			//Merge
			if (typeof data !== 'undefined'){
				data = val(data).to('array');
				data.map(function (obj){
					for (var prop in obj){
						if (prop === 'match' ||
							prop === 'submatch' ||
							prop === 'offset' ||
							prop === 'string'){
							throw new Error ('Reserved property name used: ' + prop);
						}
					}
					param = Object.assign(param, obj);
				});
			}

			return newSubstr(param);
		});
	}
	else{ //typeof redirect.to === 'string'
		str = str.replace(substr, newSubstr);
	}

	return str;
};
