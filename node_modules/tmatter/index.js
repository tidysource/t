'use strict';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const frontmatter = require('front-matter');

module.exports = function tMatter(input){
	//Default read input as UTF-8
	if (Buffer.isBuffer(input)){
		input = input.toString('utf8');
	}

	//Parse frontmatter
	let fm = frontmatter(input);

	let result = fm.attributes;

	//Parse markdown
	let content = md.render(fm.body).trim();
	result._content = content.trim();

	//Set other stuff
	result._options = 'utf8';
	result._ext = '.html';

	//Return parser result
	return result;
};
