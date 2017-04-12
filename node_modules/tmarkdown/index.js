'use strict';

var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();

module.exports = function tMarkdown(input){
	//Read input as UTF-8
	if (Buffer.isBuffer(input)){
		input = input.toString('utf8');
	}
	
	//Parse markdown
	var content = md.render(input);
	content = content.trim();
	
	//Return parser result
	return {
		_options : 'utf-8',
		_ext : '.html',
		_content : content
	}
};