'use strict';

var tMustache = require('tmustache');
var tMarkdown = require('tmarkdown');

var config = {
	baseURL : './',
	folders : {
		data : './_data',
		templates : './_template',
		result : './_public'
	},
	parse : {
		md : tMarkdown,
		json : JSON.parse,
		html : 'utf8',
		js : 'utf8',
		css : 'utf8'
	},
	templateEngine : tMustache,
	write : {
		string : 'uft8' // options
	}
	//Read templates as utf8
};

module.exports = config;