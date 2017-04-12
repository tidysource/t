'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var tMarkdown = require('../index.js');

/*
Tests
=====
*/
test('tMarkdown()', function(assert){
    assert.plan(1);

	var markdown = '# Hello world';
	var result = {
		_options: 'utf-8',
		_ext : '.html',
		_content : '<h1>Hello world</h1>'
	};

	assert.deepEqual(result,
					tMarkdown(markdown),
					'h1');
});

