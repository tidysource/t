'use strict';

var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();

module.exports = function tMarkdown(input){
	var content = md.render(input);
	content = content.trim();
	
	return {
		_ext : '.html',
		_content : content
	}
};