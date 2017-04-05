'use strict';

var config = {
	folders : {
		data : './_data',
		templates : './_template',
		result : './_public'
	},
	parse : {
		json : JSON.parse,
		html : 'utf8',
		md : 'utf8',
		js : 'utf8',
		css : 'utf8'
	},
	//templateEngine(item)
	write : {
		string : 'uft8' // options
	}
	//Read templates as utf8
};

module.exports = config;