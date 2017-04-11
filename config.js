'use strict';

var tMustache = require('tmustache');

var config = {
	baseURL : './',
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
	templateEngine : tMustache(),
	write : {
		string : 'uft8' // options
	}
	//Read templates as utf8
};

module.exports = config;