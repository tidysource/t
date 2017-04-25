'use strict';

var tMustache = require('tmustache');
var tMatter = require('tmatter');
var path = require('tidypath');

var config = {
	data : {
		options : null,
		type : {
			asset : /[\\\/]asset[\\\/]/,
			meta : /[\\\/]meta[\\\/]/
		}
	},
	folder : {
		data : './_data',
		template : './_template',
		result : './_public'
	},
	parse : {
		md : tMatter,
		json : JSON.parse,
		html : 'utf8',
		js : 'utf8',
		css : 'utf8'
	},
	url: {
		base : './',
		folderize : true,
		rebase : [{
			from : /^\.[\\\/]posts[\\\/].+/,
			to : function(param){
					let original = param.match;
					let separator = path.separator;
					return original.replace(/[\\\/][0-9]+[\\\/]/, separator);
				},
		}],
	},
	template : {
		engine : tMustache,
		options : 'utf8'
	}
};

module.exports = config;
