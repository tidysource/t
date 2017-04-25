'use strict';

/*
Setup testing environment
=========================
*/
//Testing modules
var test = require('tidytest');

//Module to test
var tMatter = require('../index.js');

/*
Tests
=====
*/
test('tMatter()', function(assert){
    assert.plan(1);

	var content = [
                    '---',
                    'title: Hello',
                    'description: World',
                    '---',
                    '# Hello world'
                    ].join('\r\n');

    var result = {
        title : 'Hello',
        description : 'World',
		_options: 'utf8',
		_ext : '.html',
		_content : '<h1>Hello world</h1>'
	};

	assert.deepEqual(result,
					tMatter(content),
					'basic example');
});
